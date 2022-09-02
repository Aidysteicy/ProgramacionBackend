const socket = io();
const fecha = new Date().toLocaleString()

function renderMessage(data){
    let html
    if(data===-1){
        html =`<div>No hay mensajes anteriores</div>`
    }else{
        html = data.map((elem)=>{
        return (`<div style="color:brown"><strong style="color:blue">${elem.email}</strong>
                    [${elem.fecha}]:
                    <em style="color:green"> ${elem.mensaje}</em>
                </div>`)
    }).join(" ")
    }
    document.querySelector('#mensajes').innerHTML = html
}

function renderTabla(data){
    let html
    if(data===-1){
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
        email: document.querySelector('#email').value,
        fecha: fecha,
        mensaje: document.querySelector('#mensaje').value
    }
    socket.emit('nuevo-mensaje', mensaje)
    document.querySelector('#email').value=''
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
