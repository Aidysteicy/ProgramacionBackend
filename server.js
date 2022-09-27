const Contenedor = require('./contenedor')
const {ContenedorFirebase} = require('./contenedorFirebase.js')
const contenedor = new Contenedor('./productos.json');
//const mensajeria = new ContenedorFirebase('mensajes')
const mensajeria = new Contenedor('./mensajeria.json')
const express = require('express');
const {Server: ServerHttp} = require('http')
const {Server: ServerIo} = require('socket.io')
const app = express();
const httpServer = new ServerHttp(app)
const io = new ServerIo(httpServer)
const handlebars = require('express-handlebars')
const normalizr = require('normalizr');
const {normalize, denormalize, schema} = normalizr

const ApiProductos = require ('./api/productos.js')
const apiProductos = new ApiProductos()

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('views', './views')
app.set('view engine', 'hbs')

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('main')
})

app.get('/api/productos-test', async (req,res)=>{
    const data = await apiProductos.productosAleatorios()
    res.render('productosTest', {data})
})

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

//Configuracion del puerto
const PORT = process.env.PORT || 4000
httpServer.listen(PORT,()=> {
    console.log(`Escuchando en el puerto: ${PORT}`);
});
httpServer.on('error', error => console.log(`Error en servidor: ${error}`))