import dotenv from 'dotenv'
dotenv.config()

let productosDao
let carritoDao

    switch(process.env.DB){
        case 'file':
            const {ProductosDaoArchivo} = await import ('./productos/ProductosDaoArchivo.js')
            productosDao = new ProductosDaoArchivo('../database/productos.json')
            const CarritoDaoArchivo = await import ('./carrito/CarritoDaoArchivo.js')
            carritoDao = new CarritoDaoArchivo('../database/carritos.json')
            break;
    
        case 'mongodb':
            const {ProductosDaoMongo} = await import('./productos/ProductosDaoMongo.js')
            productosDao = new ProductosDaoMongo()
            const {CarritoDaoMongo} = await import('./carrito/CarritoDaoMongo.js')
            carritoDao = new CarritoDaoMongo()
            break;
    
        case 'firebase':
            const {ProductosDaoFirebase} = await import('./productos/ProductosDaoFirebase.js')
            productosDao = new ProductosDaoFirebase()
            const {CarritoDaoFirebase} = await import('./carrito/CarritoDaoFirebase.js')
            carritoDao = new CarritoDaoFirebase()
            break;
    }


export { productosDao , carritoDao }