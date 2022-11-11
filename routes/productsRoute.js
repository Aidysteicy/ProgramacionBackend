const productosDaoMongo = require('../daos/ProductosDaoMongo.js') ;
const productosDao = new productosDaoMongo()
const { Router } = require('express') ;
const logger = require('../logger.js')
const rutaProductos = Router()
const authMiddleware = require('../middlewares/auth.middle');

//Variable booleana que controla si el usuario es administrador
const admin = true

//**********Rutas a los productos***********//

rutaProductos.get('/', authMiddleware, async (req,res)=>{
    const prod = await productosDao.getAll()
    if(prod.length!=0 && prod!='nok'){
        res.render('main', {isRender: true, productos: prod})
    }else{
        res.render('main', {isRender: false, productos: prod})
    }
});

rutaProductos.get('/:id', authMiddleware, async (req,res)=>{
    const {id} = req.params
    const prod = await productosDao.getbyId(id);
    if(prod!='nok'){
        res.render('main', {isRender: true, productos: prod})
     }else{
         logger.error('No existe un producto con ese ID')
         res.redirect('/')
     }
});
//Agregar producto
rutaProductos.post('/', async (req,res)=>{
    if(admin){
        const producto = req.body
        const status = await productosDao.save(producto, 'productos')
        if(status!='nok'){
            logger.info('Producto Guardado') 
         }else{
            logger.error('Error al añadir producto')
         }
    }else{
        logger.error({error: -1, descripcion: 'Ruta /api/productos metodo POST no autorizada'})
    }res.redirect('/')
});
//Actualizar producto
rutaProductos.put('/:id', async (req,res)=>{
    if(admin){
       const {id}=req.params
        const prod = req.body
        const mod = await productosDao.saveByID(id, prod)
        if(mod.length!=0 && mod!='nok'){
            logger.info('Producto Actualizado') 
         }else{
            logger.error('Error al actualizar producto')
         }
    }else{
        logger.error({error: -1, descripcion: 'Ruta /api/productos/:id metodo PUT no autorizada'})
        res.redirect('/')
    }
    
});
//Eliminar producto
rutaProductos.delete('/:id', async (req,res)=>{
    if(admin){
        const {id}=req.params
        const prod = await productosDao.deleteById(id)
        if(prod.length!=0 && prod!='nok'){
            logger.info('Producto Eliminado') 
         }else{
            logger.warn('No existe un producto con ese ID')
         }
    }else{
        logger.error({error: -1, descripcion: 'Ruta /api/productos/:id metodo DELETE no autorizada'})
        res.redirect('/')
    }
});

//**********Rutas no implementadas***********//

rutaProductos.get('*', (req,res)=>{
    res.redirect('/login')
})


module.exports = rutaProductos;