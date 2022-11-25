const Contenedor = require ("../daos/productosDaoDB")
const generarProducto = require('../utils/generarProducto.js')
import ProductoDto from '../dto/ProductoDto.js';

class Cotizador {
    static VALOR_DOLAR = 100

    getPrecioSegunMoneda(precio, moneda) {
        switch (moneda) {
            case 'USD':
                return precio * Cotizador.VALOR_DOLAR
            default:
                return precio
        }
    }
}

class ApiProductos extends Contenedor {
    constructor(){
        super('Productos')
    }

    async productosAleatorios(){
        await this.deleteAll()
        for(let i=0; i<5; i++){
            const nuevoProd = generarProducto(i+1)
            await this.save(nuevoProd)   
        }
        return await this.getAll()
    }

    async agregar(prodParaAgregar) {
        const prodAgregado = await this.save(prodParaAgregar);
        return prodAgregado;
    }

    async buscar(id) {
        let productos;
        if (id) {
            productos = await this.getbyField(id);
        } else {
            productos = await this.getAll();
        }
        return productos;
    }

    async borrar(id) {
        if (id) {
            await this.deleteById(id);
        }
        else {
            await this.deleteAll();
        }
    }

    async reemplazar(id, prodParaReemplazar) {
        const prodReemplazado = await this.saveById(id, prodParaReemplazar);
        return prodReemplazado;
    }

    async buscarConCotizacionEnDolares(id) {
        if (id) {
            const producto = await this.getById(id);
            const cotizaciones = { precioDolar: this.cotizador.getPrecioSegunMoneda(producto.precio, 'USD') }
            const productoDto = new ProductoDto(producto, cotizaciones)
            return productoDto
        } else {
            const productos = await this.productosDao.getAll();
            const productosDtos = productos.map(producto => {
                const cotizaciones = { precioDolar: this.cotizador.getPrecioSegunMoneda(producto.precio, 'USD') }
                const productoDto = new ProductoDto(producto, cotizaciones)
                return productoDto
            })
            return productosDtos;
        }
    }

    exit() {
        this.exit();
    }

}

module.exports= ApiProductos
