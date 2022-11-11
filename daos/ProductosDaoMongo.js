const  ContenedorMongo = require('../contenedores/contenedorMongo.js');
const Producto = require('../models/productos.model.js');

class ProductosDaoMongo extends ContenedorMongo{

    constructor(){
        super(Producto)
    }
    
}

module.exports = ProductosDaoMongo
