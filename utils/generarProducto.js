const {faker} = require('@faker-js/faker')
faker.locale = 'es'

function generarProducto(id){
    return {
        id,
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.internet.avatar()
    }
}

module.exports = generarProducto

