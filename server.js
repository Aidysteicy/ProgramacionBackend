const Contenedor = require('./contenedor')
const contenedor = new Contenedor('./productos.txt');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080
const server = app.listen(PORT,()=> {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
});
server.on('Ocurrió un error ', error => console.log(error));

app.get('/productos', async (req,res)=>{
    const prod = await contenedor.getAll()
    res.send(prod)
});

app.get('/productosRandom', async (req,res)=>{
    const prod = await contenedor.getIDRandom()
    res.send(prod)
});