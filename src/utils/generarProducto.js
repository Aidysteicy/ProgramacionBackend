const {faker} = require('@faker-js/faker')
faker.locale = 'es'

function generarProducto(id){
    return {
        id,
        nombre: faker.commerce.product(),
        precio: faker.commerce.price(),
        foto: faker.internet.avatar()
    }
}

module.exports = generarProducto

