const {config } = require('./conexionDB.js') ;
const admin = require("firebase-admin");

const serviceAccount = config;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

class ContenedorFirebase {

    constructor(nombre){
        this.nombre = nombre
    }

    async save(objeto){
        const db = admin.firestore()
        const query = db.collection(this.nombre)
        let id=1
        try {
            let productos = await this.getAll();
            if(productos != 'nok'){
                id=productos.length+1
            }
            const doc = query.doc(`${id}`)
            await doc.create(objeto)
            return 'ok'
            } catch (error) {
            console.log(error)
            return 'nok'
        }
    }

    async getAll(){
        const db = admin.firestore()
        const query = db.collection(this.nombre)
        try {
            const read = await query.get()
            const resp = read.docs.map(document => ({id: document.id, productos:[{...document.data()}]}))
            return resp
        } catch (error) {
            console.log(error)
            return 'nok'
        }
    }

    async saveByID(id, objeto){
        const db = admin.firestore()
        const query = db.collection(this.nombre)
        try {
            const doc = query.doc(`${id}`)
            await doc.update(objeto)
            return 'ok'
        } catch (error) {
            console.log(error);
            return 'nok'
        }
    }

    async getbyId(id){
        const db = admin.firestore()
        const query = db.collection(this.nombre)
        try {
            const doc = query.doc(`${id}`)
            const item = await doc.get()
            if(item.data()){
                return {id: item.id, ...item.data()}
            }else{
                return 'nok'
            }
        } catch (error) {
            console.log(error)
            return 'nok'
        }
    }

    async deleteById(id){
        const db = admin.firestore()
        const query = db.collection(this.nombre)
        try {
            let productos = await this.getAll()
            const prodID = productos.find(prod => prod.id == id)
            if(prodID){
                const doc = query.doc(`${id}`)
                await doc.delete()
                return 'ok'    
            }
            return 'nok'
        } catch (error) {
            console.log(error)
            return 'nok'
        }
    }
    
}

module.exports = {ContenedorFirebase}