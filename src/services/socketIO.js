const ContenedorMongo = require('../contenedores/contenedorMongo')
const ProductosDao = require('../daos/productosDaoDB.js')
const model = require('../models/productos')
const modelM = require('../models/mensajes')
const contenedor = new ProductosDao(model)
const mensajeria = new ProductosDao(modelM)

const normalizr = require('normalizr');
const {normalize, schema} = normalizr

const authorSchema = new schema.Entity('author', {}, {idAttribute: "id"})
const textSchema = new schema.Entity('text')
const postSchema = [{
    author: authorSchema,
    text: textSchema
}]

async function misocket (socket){
        const productos = await contenedor.getAll()
        console.log(productos)
        const messages = await mensajeria.getAll()
        let normalizedMensajes = messages
        if(messages=='ok'){
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
    }

module.exports= misocket
