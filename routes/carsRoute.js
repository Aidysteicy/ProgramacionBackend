const Carritos = require('../controllers/carritos.js')
const carritos = new Carritos('./database/carritos.json');

const express = require('express');
const rutaCarrito = express.Router()

//**********Rutas al carrito***********//

//Mostrar todos los carritos
rutaCarrito.get('/', async (req,res)=>{
    const carr = await carritos.getAll()
    res.send(carr)
});
//Mostrar productos de un carrito específico
rutaCarrito.get('/:id/productos', async (req,res)=>{
    const {id} = req.params
    const micarrito = await carritos.getbyId(+id);
    res.json(micarrito)
});
//Agregar un carrito
rutaCarrito.post('/', async (req,res)=>{
    const producto = req.body
    const id = await carritos.create(producto)
    res.json({
        msg: 'Carrito Agregado',
        id: id
    })
})
//Agregar producto al carrito indicado
rutaCarrito.post('/:id/productos', async (req,res)=>{
    const producto = req.body
    const {id} = req.params
    const idPro = await carritos.save(+id, producto)
    res.json({
        msg: 'Producto Agregado',
        id: idPro
    })
})
//Eliminar el carrito
rutaCarrito.delete('/:id', async (req,res)=>{
    const {id}=req.params
    const prod = await carritos.deleteById(+id)
    res.json(prod)
});
//Eliminar un producto del carrito
rutaCarrito.delete('/:id/productos/:id_prod', async (req,res)=>{
    const {id, id_prod}=req.params
    const prod = await carritos.deleteProdById(+id, +id_prod)
    res.json(prod)
});

//**********Rutas no implementadas***********//

rutaCarrito.get('*', (req,res)=>{
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})

module.exports = rutaCarrito;