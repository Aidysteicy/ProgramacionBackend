const { Schema, model } = require ('mongoose')

const productosSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
    descripcion: {
        type: String,
        trim: true,
        max: 50
    },
    codigo: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
    foto: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
    },
})

module.exports = model('Producto', productosSchema)