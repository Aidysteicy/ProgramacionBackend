const Contenedor = require('./contenedor')
const contenedor = new Contenedor('./files/productos.txt');

const express = require('express');
const app = express();

const {Router} = express
const rutaProductos = Router()

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/productos', rutaProductos)

rutaProductos.get('/', async (req,res)=>{
    const prod = await contenedor.getAll()
    res.send(prod)
});

rutaProductos.get('/:id', async (req,res)=>{
    const {id} = req.params
    const prod = await contenedor.getbyId(+id);
    res.json(prod)
});


rutaProductos.post('/', async (req,res)=>{
    const producto = req.body
    const id = await contenedor.save(producto)
    prod = {...producto, id: id}
    res.json({
        msg: 'Producto Agregado',
        prod
    })
});

rutaProductos.put('/:id', async (req,res)=>{
    const {id}=req.params
    const prod = req.body
    const mod = await contenedor.saveByID(+id, prod)
    res.json(mod)
});

rutaProductos.delete('/:id', async (req,res)=>{
    const {id}=req.params
    const prod = await contenedor.deleteById(+id)
    res.json(prod)
});

app.get('/api/productosRandom', async (req,res)=>{
    const prod = await contenedor.getIDRandom()
    res.json(prod)
});

//Configuración del puerto del servidor

const PORT = process.env.PORT || 8080
const server = app.listen(PORT,()=> {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
});
server.on('Ocurrió un error ', error => console.log(error));
