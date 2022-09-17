import { productosDao } from '../daos/index.js';
import { Router } from 'express';
const rutaProductos = Router()

//Variable booleana que controla si el usuario es administrador
const admin = true

//**********Rutas a los productos***********//

rutaProductos.get('/', async (req,res)=>{
    const prod = await productosDao.getAll()
    if(prod.length!=0 && prod!='nok'){
       res.send(prod) 
    }else{
        res.send({msg: 'No existen productos creados'})
    }
});

rutaProductos.get('/:id', async (req,res)=>{
    const {id} = req.params
    const prod = await productosDao.getbyId(id);
    if(prod!='nok'){
        res.send(prod) 
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
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})


export default rutaProductos;