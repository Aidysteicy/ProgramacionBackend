const fs = require('fs').promises;

class ContenedorProducto {

    constructor( ruta){
        this.ruta = ruta;
        this.fs = fs;
    }

    async save(objeto){
        let id = 1
        try {
            let productos = await this.getAll();
            if(productos === undefined){
                productos = await this.fs.writeFile(this.ruta, JSON.stringify([{id: id, timestamp: Date.now(), ...objeto}], null, 2))
            }else{
                productos.forEach(() => {
                    if(productos.find(prod => prod.id === id)){
                        id++;
                    }
                });
            await this.fs.writeFile(this.ruta, JSON.stringify([...productos, {id: id, timestamp: Date.now(), ...objeto}], null, 2))
            }
        return id;
        } catch (error) {
            console.log(error);
        }
    }

    async saveByID(id, objeto){
        try {
            let productos = await this.getAll();
            const prodID = productos.findIndex(prod => prod.id === id)
            if(prodID!==-1){
                productos[prodID]={id:id, timestamp: Date.now(), ...objeto}
                await this.fs.writeFile(this.ruta, JSON.stringify(productos, null, 2))
                return {msg: 'Producto Modificado', prod: productos[prodID]}
            }else{
                return {error: 'Producto no encontrado'}
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getbyId(id){
        try {
            const productos = await this.getAll();
            const prodID = productos.find(prod => prod.id === id)
            if(prodID){
                return prodID; 
            }
            return {error: 'No existe un producto con ese ID'}
        } catch (error) {
            console.log(error)
        }
        
    }

    async getAll(){
        try {
            const productos = await this.fs.readFile(this.ruta, 'utf-8');
            const prodJson = JSON.parse(productos);
            return prodJson;
        } catch (error) {
            console.log('Archivo no Existe')
        }
    }

    async deleteById(id){
        try {
            const productos = await this.getAll();
            const prodID = productos.find(prod => prod.id === id)
            if(prodID){
                const nuevos_productos = productos.filter(prod => prod.id !== id)
                await this.fs.writeFile(this.ruta, JSON.stringify(nuevos_productos, null, 2))
                return {msg: 'Producto Eliminado', prod: prodID}
            }else{
                return {error: 'Producto no encontrado'}
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            await this.fs.writeFile(this.ruta, [])
            console.log('Todos los productos fueron borrados')
        } catch (error) {
            console.log(error);
        }
    }

    async getIDRandom(){
        try {
            let productos = await this.getAll();
            let num = Math.floor(Math.random()*productos.length)+1;
            return await this.getbyId(num);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorProducto;