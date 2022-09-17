import rutaCarrito from './src/routes/carsRoute.js';
import rutaProductos from './src/routes/productsRoute.js';
import express, { json, urlencoded } from 'express';

const app = express();

//********************************************//
app.use(json());
app.use(urlencoded({extended: true}));
app.use('/api/productos', rutaProductos)
app.use('/api/carrito', rutaCarrito)

//****Configuración del puerto del servidor****//

const PORT = process.env.PORT || 8080
const server = app.listen(PORT,()=> {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
});
server.on('Ocurrió un error ', error => console.log(error));