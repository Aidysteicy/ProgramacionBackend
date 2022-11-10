const { Schema, model } = require ('mongoose')

const mensajesSchema = new Schema({
    author: {
        type: Object
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
})

module.exports = model('Mensajes', mensajesSchema)