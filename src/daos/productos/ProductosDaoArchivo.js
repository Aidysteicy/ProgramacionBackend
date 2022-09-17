import { ContenedorProducto } from '../contenedores/contenedorProducto.js'

class ProductosDaoArchivo extends ContenedorProducto {
    constructor(){
        super('./database/productos.json')
    }
}

export default ProductosDaoArchivo