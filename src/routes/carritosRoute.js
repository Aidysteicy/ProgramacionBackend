const express =require('express')
const authMiddleware = require('../middlewares/auth.middle');
const routerProductos = express.Router();
const multer = require("multer");
const storage = multer({ destinantion: "/upload" });
const logger = require('../config/logger.js')

const ProductosDao = require('../daos/productosDaoDB.js')
const model = require('../models/productos')
const contenedor = new ProductosDao(model)

//Variable booleana que controla si el usuario es administrador
const admin = true

routerProductos.get("/productos", authMiddleware, async (req, res) => {
	const productos = await contenedor.getAll()
    let flag
    productos===undefined || productos.length===0 ? flag=false : flag=true
	res.render("productos", {
		isRender: flag, productos: productos
	});
});

routerProductos.get('/:id', authMiddleware, async (req,res)=>{
    const {id} = req.params
    const prod = await contenedor.getbyId(id);
    if(prod!='nok'){
        res.render('main', {isRender: true, productos: prod})
     }else{
         logger.error('No existe un producto con ese ID')
         res.redirect('/')
     }
});
//Agregar producto
routerProductos.post('/', async (req,res)=>{
    if(admin){
        const producto = req.body
        const status = await contenedor.save(producto, 'productos')
        if(status=='ok'){
            logger.info('Producto Guardado') 
         }else{
            logger.error('Error al añadir producto')
         }
    }else{
        logger.error({error: -1, descripcion: 'Ruta /api/productos metodo POST no autorizada'})
    }res.redirect('/')
});
//Actualizar producto
routerProductos.put('/:id', async (req,res)=>{
    if(admin){
       const {id}=req.params
        const prod = req.body
        const mod = await contenedor.saveByID(id, prod)
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
routerProductos.delete('/:id', async (req,res)=>{
    if(admin){
        const {id}=req.params
        const prod = await contenedor.deleteById(id)
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

routerProductos.get('*', (req,res)=>{
    res.redirect('/login')
})

module.exports = { routerProductos };