const productosDaoMongo = require('../daos/ProductosDaoMongo.js') ;
const productosDao = new productosDaoMongo()
const { Router } = require('express') ;
const rutaProductos = Router()

//const ContenedorMongo = require('./contenedores/contenedorMongo.js')
//const model = require('./models/productos.js')
//const contenedor = new ContenedorMongo(model)

//Variable booleana que controla si el usuario es administrador
const admin = true

//**********Rutas a los productos***********//

rutaProductos.get('/', async (req,res)=>{
    const prod = await productosDao.getAll()
    console.log(prod)
    if(prod.length!=0 && prod!='nok'){
        res.render('main', {isRender: true, productos: prod})
    }else{
        res.render('main', {isRender: false, productos: prod})
    }
});

rutaProductos.get('/:id', async (req,res)=>{
    const {id} = req.params
    const prod = await productosDao.getbyId(id);
    if(prod!='nok'){
        res.render('main', {isRender: true, productos: prod})
     }else{
         res.send({msg: 'No existe un producto con ese ID'})
     }
});
//Agregar producto
rutaProductos.post('/', async (req,res)=>{
    if(admin){
        const producto = req.body
        const status = await productosDao.save(producto, 'productos')
        if(status!='nok'){
            res.send({msg: 'Producto Guardado'}) 
         }else{
            res.send({msg: 'Error al añadir producto'})
         }
    }else{
        res.json({error: -1, descripcion: 'Ruta /api/productos metodo POST no autorizada'})
    }
});
//Actualizar producto
rutaProductos.put('/:id', async (req,res)=>{
    if(admin){
       const {id}=req.params
        const prod = req.body
        const mod = await productosDao.saveByID(id, prod)
        if(mod.length!=0 && mod!='nok'){
            res.send({msg: 'Producto Actualizado'}) 
         }else{
             res.send({msg: 'Error al actualizar producto'})
         }
    }else{
        res.json({error: -1, descripcion: 'Ruta /api/productos/:id metodo PUT no autorizada'})
    }
    
});
//Eliminar producto
rutaProductos.delete('/:id', async (req,res)=>{
    if(admin){
        const {id}=req.params
        const prod = await productosDao.deleteById(id)
        if(prod.length!=0 && prod!='nok'){
            res.send({msg: 'Producto Eliminado'}) 
         }else{
            res.send({msg: 'No existe un producto con ese ID'})
         }
    }else{
        res.json({error: -1, descripcion: 'Ruta /api/productos/:id metodo DELETE no autorizada'})
    }
});

//**********Rutas no implementadas***********//

rutaProductos.get('*', (req,res)=>{
    res.redirect('/')
})


module.exports = rutaProductos;