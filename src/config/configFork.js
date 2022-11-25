const randoms = require('./utils/generarObjNAleatorios')

process.on("resp", (cant)=>{
    console.log(cant)
    const respuesta = randoms(+cant, 0, 1000)
    process.send(respuesta)
})

