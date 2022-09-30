const express = require("express");
const router = express.Router();
const sessionR = require('./session.js')
const ApiProductos = require ('../api/productos.js')
const apiProductos = new ApiProductos()

router.get('/', (req,res)=>{
    res.render('login')
})

router.get('/api/productos-test', async (req,res)=>{
    const data = await apiProductos.productosAleatorios()
    res.render('productosTest', {data})
})

router.use(sessionR)

module.exports = router;