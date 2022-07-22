const Contenedor = require('./contenedor')
const fs = require('fs').promises;
const contenedor = new Contenedor(fs, './productos.txt')

contenedor.save(
    {
    title: 'Colores', 
    price: 345.67, 
    thumbnail: 'https://cdn.shopify.com/s/files/1/1086/1234/products/257W_opt_1024x1024.jpg?v=1579740224'
});
//contenedor.getbyId(5)
//contenedor.deleteById(10)
//contenedor.getAll()
//contenedor.deleteAll()