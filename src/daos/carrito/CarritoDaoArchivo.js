import { ContenedorCarrito } from '../../contenedores/contenedorCarrito.js'

class CarritoDaoArchivo extends ContenedorCarrito {
    constructor(){
        super('database/carritos.json')
    }
}

export default CarritoDaoArchivo