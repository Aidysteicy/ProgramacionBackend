const fs = require('fs').promises;

class Contenedor {

    constructor( ruta){
        this.ruta = ruta;
        this.fs = fs;
    }

    async save(objeto){
        let id = 1
        try {
            let productos = await this.getAll();
            if(productos === 'nok'){
                productos = await this.fs.writeFile(this.ruta, JSON.stringify([{...objeto}], null, 2))
                console.log('Archivo Creado')
            }else{
                await this.fs.writeFile(this.ruta, JSON.stringify([...productos, {...objeto}], null, 2))
            }
        console.log('Producto Agregado')
        return id;
        } catch (error) {
            return {Error: error}
        }
    }

    async saveByID(id, objeto){
        try {
            let productos = await this.getAll();
            if(productos === 'nok'){
                productos = await this.fs.writeFile(this.ruta, JSON.stringify([{...objeto, id:id}], null, 2))
                console.log('Archivo Creado')
            }else{
                await this.fs.writeFile(this.ruta, JSON.stringify([...productos, {...objeto, id: id}], null, 2))
            }
        } catch (error) {
            console.log(error);
        }
    }


    async getAll(){
        try {
            const productos = await this.fs.readFile(this.ruta, 'utf-8');
            const prodJson = JSON.parse(productos);
            return prodJson;
        } catch (error) {
            console.log('Archivo no Existe')
            return 'nok'
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

}

module.exports = Contenedor;