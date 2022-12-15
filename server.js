const app = require('./app')
const cluster = require('cluster')
const {Server: ServerHttp} = require('http')
const httpServer = new ServerHttp(app)

const {addProd, testgetProd, testgetProdId} = require('./src/test/axios')

testgetProd()

//******Configuración del Server******/
const yargs = require('yargs/yargs')(process.argv.slice(2))
const argsDefault = yargs.default(
    {
        port: '8080',
    }
).argv
const PORT = process.env.PORT
const mode = process.argv.slice(3) || FORK
const numCPUs = require('os').cpus().length
/*
if(mode==="CLUSTER"){
    if(cluster.isPrimary){
        for(let i=0; i<numCPUs; i++){
            cluster.fork()
        }
        cluster.on("exit", (worker) => {
            console.log(`Process ID : ${worker.process.pid} finished`)
        })
    }else{
        httpServer.listen(PORT, err => {
            if (err) {
                throw new Error(`Error en el servidor: ${err}`)
            }
            console.log(`Server Cluster running in ${PORT}`)
        })
    }
}
if(mode==="FORK"){
    httpServer.listen(PORT, err => {
        if (err) {
            throw new Error(`Error en el servidor: ${err}`)
        }
        console.log(`Server Fork running in ${PORT}`)
    })
}*/
httpServer.listen(PORT, err => {
    if (err) {
        throw new Error(`Error en el servidor: ${err}`)
    }
    console.log(`Server Fork running in ${PORT}`)
})

module.exports = {httpServer, PORT}
    
    
