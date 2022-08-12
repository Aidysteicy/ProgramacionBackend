const Contenedor = require('./contenedor')
const express = require('express');

const contenedor = new Contenedor('./productos.txt');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/productos', async (req,res)=>{
    const productos = await contenedor.getAll()
    let flag
    productos===undefined || productos.length===0 ? flag=false : flag=true
    res.render('index', {isRender: flag, productos: productos})
});

app.post('/productos', async (req,res)=>{
    const prod = req.body
    await contenedor.save(prod)
    res.redirect('http://localhost:8080/productos')
})


//Configuración del puerto del servidor

const PORT = process.env.PORT || 8080
const server = app.listen(PORT,(err)=> {
    if(err) throw new Error(`Error en el servidor: ${err}`)
    console.log(`Escuchando en el puerto: ${server.address().port}`);
});
