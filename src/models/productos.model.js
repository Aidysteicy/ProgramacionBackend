import { Schema, model } from 'mongoose'

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
    price: {
        type: Number,
        required: true,
    },
})

export default model('Producto', productosSchema)