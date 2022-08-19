const Contenedor = require('./contenedor')
const contenedor = new Contenedor('./productos.txt');
const mensajeria = new Contenedor('./mensajeria.txt')
const express = require('express');
const {Server: ServerHttp} = require('http')
const {Server: ServerIo} = require('socket.io')
const app = express();
const httpServer = new ServerHttp(app)
const io = new ServerIo(httpServer)
const handlebars = require('express-handlebars')

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

io.on('connection', async socket=>{
    console.log('Usuario conectado: ' +socket.id)
    const productos = await contenedor.getAll()
    const messages = await mensajeria.getAll()
    
    socket.emit('tabla-productos', productos)
    socket.emit('central-mensajes', messages)

    socket.on('nuevo-producto', async data=>{
        await contenedor.save(data)
        const nuevo_prod = await contenedor.getAll()
        io.sockets.emit('tabla-productos', nuevo_prod)
    })
    socket.on('nuevo-mensaje', async data=>{
        await mensajeria.save(data)
        const nuevo_mens = await mensajeria.getAll()
        io.sockets.emit('central-mensajes', nuevo_mens)
    })

    socket.on('disconnect', ()=>{
        console.log('Usuario desconectado')
    })
})

//Configuracion del puerto
const PORT = process.env.PORT || 4000
httpServer.listen(PORT,()=> {
    console.log(`Escuchando en el puerto: ${PORT}`);
});