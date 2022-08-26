const Contenedor = require('../controllers/contenedor.js')
const contenedor = new Contenedor('./database/productos.json');

const express = require('express');
const rutaProductos = express.Router()

//Variable booleana que controla si el usuario es administrador
const admin = false

//**********Rutas a los productos***********//

rutaProductos.get('/', async (req,res)=>{
    const prod = await contenedor.getAll()
    if(prod){
       res.send(prod) 
    }else{
        res.send({msg: 'No existen productos creados'})
    }
    
});

rutaProductos.get('/:id', async (req,res)=>{
    const {id} = req.params
    const prod = await contenedor.getbyId(+id);
    if(prod){
        res.send(prod) 
     }else{
         res.send({msg: 'No existe un producto con ese ID'})
     }
});
//Agregar producto
rutaProductos.post('/', async (req,res)=>{
    if(admin){
        const producto = req.body
        const id = await contenedor.save(producto)
        prod = {id: id, ...producto}
        res.json({
            msg: 'Producto Agregado',
            prod
        })
    }else{
        res.json({error: -1, descripcion: 'Ruta /api/productos metodo POST no autorizada'})
    }
});
//Actualizar producto
rutaProductos.put('/:id', async (req,res)=>{
    if(admin){
       const {id}=req.params
        const prod = req.body
        const mod = await contenedor.saveByID(+id, prod)
        res.json(mod) 
    }else{
        res.json({error: -1, descripcion: 'Ruta /api/productos/:id metodo PUT no autorizada'})
    }
    
});
//Eliminar producto
rutaProductos.delete('/:id', async (req,res)=>{
    if(admin){
        const {id}=req.params
        const prod = await contenedor.deleteById(+id)
        res.json(prod) 
    }else{
        res.json({error: -1, descripcion: 'Ruta /api/productos/:id metodo DELETE no autorizada'})
    }
});

//**********Rutas no implementadas***********//

rutaProductos.get('*', (req,res)=>{
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})


module.exports = rutaProductos;