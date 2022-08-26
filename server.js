const rutaCarrito = require('./routes/carsRoute.js')
const rutaProductos = require('./routes/productsRoute.js')
const express = require('express');

const app = express();

//********************************************//
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', rutaProductos)
app.use('/api/carrito', rutaCarrito)

//****Configuración del puerto del servidor****//

const PORT = process.env.PORT || 8080
const server = app.listen(PORT,()=> {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
});
server.on('Ocurrió un error ', error => console.log(error));


/*const Contenedor = require('./controllers/contenedor')
const Carritos = require('./controllers/carritos')
const contenedor = new Contenedor('./database/productos.json');
const carritos = new Carritos('./database/carritos.json');

const express = require('express');
const rutaProductos = express.Router()
const rutaCarrito = express.Router()

//Variable booleana que controla si el usuario es administrador
const admin = true

//**********Rutas a los productos***********

rutaProductos.get('/', async (req,res)=>{
    const prod = await contenedor.getAll()
    res.send(prod)
});

rutaProductos.get('/:id', async (req,res)=>{
    const {id} = req.params
    const prod = await contenedor.getbyId(+id);
    res.json(prod)
});
//Agregar producto
rutaProductos.post('/', async (req,res)=>{
    console.log(req.body)
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

//**********Rutas al carrito***********

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

//**********Rutas no implementadas***********

rutaProductos.get('*', (req,res)=>{
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})

rutaCarrito.get('*', (req,res)=>{
    res.json({error: -2, descripcion: 'Ruta metodo GET no implementada'}) 
})

module.exports = {rutaProductos, rutaCarrito};*/