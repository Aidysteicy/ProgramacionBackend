const { Schema, model } = require ('mongoose')

const usuariosSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
    password: {
        type: String,
        trim: true
    },
})

module.exports = model('Usuario', usuariosSchema)