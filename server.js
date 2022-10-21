const app = require('./app')
const {fork} = require('child_process')
const cluster = require('cluster')
const {Server: ServerHttp} = require('http')
const {Server: ServerIo} = require('socket.io')
const httpServer = new ServerHttp(app)
const io = new ServerIo(httpServer)
const ContenedorMongo = require('./contenedores/contenedorMongo.js')
const model = require('./models/productos.js')
const modelM = require('./models/mensajes.js')
const contenedor = new ContenedorMongo(model)
const mensajeria = new ContenedorMongo(modelM)

const normalizr = require('normalizr');
const {normalize, schema} = normalizr

const authorSchema = new schema.Entity('author', {}, {idAttribute: "id"})
const textSchema = new schema.Entity('text')
const postSchema = [{
    author: authorSchema,
    text: textSchema
}]

try {
    io.on('connection', async socket=>{
        const productos = await contenedor.getAll()
        const messages = await mensajeria.getAll()
        let normalizedMensajes = messages
        if(messages!='nok'){
            normalizedMensajes = normalize(messages, postSchema)
        }
        socket.emit('tabla-productos', productos)
        socket.emit('central-mensajes', normalizedMensajes)
        socket.on('nuevo-producto', async data=>{
            await contenedor.save(data)
            const nuevo_prod = await contenedor.getAll()
            io.sockets.emit('tabla-productos', nuevo_prod)
        })
        socket.on('nuevo-mensaje', async data=>{
            await mensajeria.save(data)
            const nuevo_mens = await mensajeria.getAll()
            const normalizedMensaje = normalize(nuevo_mens, postSchema)
            io.sockets.emit('central-mensajes', normalizedMensaje)
        })
    })
} catch (error) {
    console.log(error)
}

//******Configuración del Server******/
const yargs = require('yargs/yargs')(process.argv.slice(2))
const argsDefault = yargs.default(
    {
        port: '8080',
    }
).argv
const PORT = argsDefault.port
const mode = process.argv.slice(3) || FORK
const numCPUs = require('os').cpus().length

if(mode==="CLUSTER"){
    if(cluster.isPrimary){
        for(let i=0; i<numCPUs; i++){
            cluster.fork()
        }
        cluster.on("exit", (worker) => {
            console.log(`Process ID : ${worker.process.pid} finished)
        }
    }else{
        httpServer.listen(PORT, err => {
            if (err) {
                throw new Error(`Error en el servidor: ${err}`)
            }
            console.info(`Server Cluster running in ${PORT}`)
        })
    }
}
if(mode==="FORK"){
    httpServer.listen(PORT, err => {
        if (err) {
            throw new Error(`Error en el servidor: ${err}`)
        }
        console.info(`Server Fork running in ${PORT}`)
    })
}
    
    
