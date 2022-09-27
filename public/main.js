const socket = io();
const fecha = new Date().toLocaleString()
const {denormalize, schema} = normalizr

const authorSchema = new schema.Entity('author', {}, {idAttribute: "id"})
const textSchema = new schema.Entity('text')
const postSchema = 
    [
        {
           author: authorSchema,
           text: textSchema
        } 
    ]

function renderMessage(data){
    let html
    const denormalizedMensajes = denormalize(data.result, postSchema, data.entities)
    if(data.result==null){
        html =`<div>No hay mensajes anteriores</div>`
    }else{
        html = denormalizedMensajes.map((elem)=>{
        return (`<div style="color:brown">
                    <strong style="color:blue">${elem.author.id}</strong>
                    [${elem.author.nombre}]: 
                    <em style="color:green"> ${elem.text}</em>
                    <img style="width:100px" src="${elem.author.avatar}" alt="MDN">
                </div>`)
        }).join(" ")
        const lmessage = JSON.stringify(denormalizedMensajes).length
        const cmessage = JSON.stringify(data.result).length
        document.querySelector('#titulo').innerText = `Centro de Mensajes (Compresión: ${(lmessage-cmessage)*100/lmessage}%)`
    }
    document.querySelector('#mensajes').innerHTML = html
    }

function renderTabla(data){
    let html
    if(data==='nok'){
        html =`<tr class="align-middle"><td colspan="3">No hay productos</td></tr>`
    }else{
        html = data.map((elem)=>{
            return (`<tr class="align-middle"><td>${elem.title}</td>
                    <td>${elem.price}</td>
                    <td><img class="imagen" src="${elem.thumbnail}"></td></tr>`)
        }).join(" ")
    }
    document.querySelector('#productos').innerHTML = html
}

const addMessage = (e)=>{
    const mensaje = {
        author: {
            id: document.querySelector('#email').value,
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            edad: document.querySelector('#edad').value,
            alias: document.querySelector('#alias').value,
            avatar: document.querySelector('#avatar').value,
        },
        text: document.querySelector('#mensaje').value,
    }
    socket.emit('nuevo-mensaje', mensaje)
    document.querySelector('#email').value=''
    document.querySelector('#nombre').value=''
    document.querySelector('#apellido').value=''
    document.querySelector('#edad').value=''
    document.querySelector('#alias').value=''
    document.querySelector('#avatar').value=''
    document.querySelector('#mensaje').value=''
    return false;
}
const addProducto = (e)=>{
    const producto={
        title: document.querySelector('#title').value,
        price: document.querySelector('#price').value,
        thumbnail: document.querySelector('#thumbnail').value
    }
    socket.emit('nuevo-producto', producto)
    document.querySelector('#title').value=''
    document.querySelector('#price').value=''
    document.querySelector('#thumbnail').value=''
    return false
}

socket.on('central-mensajes', data => renderMessage(data))
socket.on('tabla-productos', data => renderTabla(data))

socket.on('connect', ()=>{
    console.log('Servidor conectado')
})

socket.on('disconnect', ()=>{
    console.log('Servidor desconectado')
})
