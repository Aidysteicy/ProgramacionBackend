import { ContenedorMongo } from '../../contenedores/contenedorMongo.js';
import Producto from '../../models/productos.model.js';

class ProductosDaoMongo extends ContenedorMongo{

    constructor(){
        super(Producto)
    }
    
}

export {ProductosDaoMongo}
