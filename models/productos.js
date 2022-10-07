const { Schema, model } = require ('mongoose')

const productosSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
})

module.exports = model('Producto', productosSchema)