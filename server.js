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