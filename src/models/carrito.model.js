import { Schema, model } from 'mongoose'

const carritoSchema = new Schema({
    idPro: {
        type: Number,
        default: new Date()
    },
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
    dateOfJoining: {
        type: Date,
        default: new Date(),
    },
})

export default model('Carrito', carritoSchema)