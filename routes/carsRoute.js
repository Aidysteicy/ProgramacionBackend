const carritoDaoMongo = require('../daos/CarritoDaoMongo.js') ;
const { Router } = require('express') ;
const carritoDao = new carritoDaoMongo()
const rutaCarrito = Router()

//**********Rutas al carrito***********//

//Mostrar todos los carritos
rutaCarrito.get('/', async (req,res)=>{
    const carr = await carritoDao.getAll()
    if(carr.length!=0 && carr!='nok'){
        res.send(carr)
    }else{
        res.send({msg: 'No existen carritos'})
    }
});
//Mostrar productos de un carrito específico
rutaCarrito.get('/:id/productos', async (req,res)=>{
    const {id} = req.params
    const micarrito = await carritoDao.getbyId(id);
    if(micarrito.length!=0 && micarrito!='nok'){
         res.json(micarrito)
     }else{
         res.send({msg: 'No existe un carrito con ese ID'})
     }
});
//Agregar un carrito
rutaCarrito.post('/', async (req,res)=>{
    const producto = req.body
    const status = await carritoDao.save(producto)
        if(status!='nok'){
            res.send({msg: 'Producto Guardado en el carrito'}) 
         }else{
            res.send({msg: 'Error al añadir producto al carrito'})
         }
})
//Update
rutaCarrito.post('/:id/productos', async (req,res)=>{
    const producto = req.body
    const {id} = req.params
    const status = await carritoDao.saveByID(id, producto)
    if(status!='nok'){
        res.send({msg: 'Producto Guardado en el carrito'}) 
    }else{
        res.send({msg: 'Error al añadir producto al carrito'})
    }
})
//Eliminar el carrito
rutaCarrito.delete('/:id', async (req,res)=>{
    const {id}=req.params
    const prod = await carritoDao.deleteById(id)
    if(prod.length!=0 && prod!='nok'){
        res.send({msg: 'Carrito Eliminado'}) 
     }else{
        res.send({msg: 'No existe un carrito con ese ID'})
     }
});
//**********Rutas no implementadas***********//

rutaCarrito.get('*', (req,res)=>{
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})

module.exports = rutaCarrito;