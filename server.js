const app = require('./app')

const {Server: ServerHttp} = require('http')
const {Server: ServerIo} = require('socket.io')
const httpServer = new ServerHttp(app)
const io = new ServerIo(httpServer)

const Contenedor = require('./contenedor')
const contenedor = new Contenedor('./productos.json');
const mensajeria = new Contenedor('./mensajeria.json')

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
        console.log('Usuario conectado: ' +socket.id)
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
    
        socket.on('disconnect', ()=>{
            console.log('Usuario desconectado')
        })
    })
} catch (error) {
    console.log(error)
}

//******Configuración del Server******/

const PORT = process.env.PORT || 3000

httpServer.listen(PORT, ()=>{
    console.info(`Server running in ${PORT}`)
})