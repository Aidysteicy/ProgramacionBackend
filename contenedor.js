
const knex = require('knex')
class Contenedor {

    constructor(objeto, name){
        this.objeto = objeto;
        this.name = name;
    }
    
    async crearTabla(){
        const db = knex(this.objeto)
        try {
            await db.schema.createTable(this.name, table=>{
                table.increments('id')
                table.string('title')
                table.integer('price')
                table.string('thumbnail')
            })
            return console.log('tabla creada')
        } catch (err) {
            console.log(err); throw err
        } finally {
            await db.destroy()
        }
    }
    async crearMensajeria(){
        const db = knex(this.objeto)
        try {
            await db.schema.createTable(this.name, table=>{
                table.increments('id')
                table.string('email')
                table.date('fecha')
                table.string('mensaje')
            })
            return console.log('tabla creada')
        } catch (err) {
            console.log(err); throw err
        } finally {
            await db.destroy()
        }
    }

    async save(data, flag){
        const db = knex(this.objeto)
        try {
            const base = await this.getAll()
            if(base===-1){
                if(flag){
                    await this.crearTabla()
                }else{
                    await this.crearMensajeria()
                }
            }
            await db(this.name).insert(data)
            return console.log('data guardada')
        } catch (err) {
            console.log(err); throw err
        } finally{
            await db.destroy()
        }
    }

    async getAll(){
        const db = knex(this.objeto)
        try {
            const data = await db.from(this.name).select('*')
            return data
        } catch (err) {
            console.log('No existe Tabla')
            return -1
        } finally{
            await db.destroy()
        }
    }

    async deleteAll(){
        try {
            const db = knex(this.objeto)
            await db.from(this.name).del()
            return console.log('tabla borrada')
        } catch (err) {
            console.log(err); throw err
        } finally{
            await db.destroy()
        }
    }

}

module.exports = Contenedor;