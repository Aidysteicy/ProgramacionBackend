const Contenedor = require ("../contenedor.js")
const generarProducto = require('../utils/generarProducto.js')

class ApiProductos extends Contenedor {
    constructor(){
        super('productos.json')
    }

    async productosAleatorios(){
        await this.deleteAll()
        for(let i=0; i<5; i++){
            const nuevoProd = generarProducto(i+1)
            await this.save(nuevoProd)   
        }
        return await this.getAll()
    }
}

module.exports= ApiProductos
