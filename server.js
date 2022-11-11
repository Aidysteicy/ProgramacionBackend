const app = require('./app')
const {fork} = require('child_process')
const cluster = require('cluster')
const rutaCarrito = require('./routes/carsRoute.js') ;
const rutaProductos = require('./routes/productsRoute.js') ;
const { json, urlencoded } = require ('express');
const { createTransport } = require('nodemailer');
const twilio = require('twilio')

//******************************************* */
app.use(json());
app.use(urlencoded({extended: true}));
app.use('/api/productos', rutaProductos)
app.use('/api/carrito', rutaCarrito)

//********************Mail******************* */
/*
const TEST_MAIL = 'aidysteicy@gmail.com'

const transporter = createTransport({
   service: 'gmail',
   port: 587,
   auth: {
       user: 'aidines.espinoza@gmail.com',
       pass: 'Steicy220695'
   }
})

const mailOptions = {
    from: 'Servidor Node.js',
    to: 'aidysteicy@gmail.com',
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Fede</span></h1>',
    attachments: [
        {
            path: 'https://raw.githubusercontent.com/andris9/Nodemailer/master/assets/nm_logo_200x136.png'
        }
    ]
}

;(async () => {
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
     } catch (error) {
        console.log(error)
     }
})()
*/
//******************Twilio SMS****************** */
/*
const accountSid = process.env.ACCOUNT_ASID
const authToken = process.env.AUTH_TOKEN
const client = twilio(accountSid, authToken)
(async () => {
    try {
        const message = await client.messages.create({
        body: 'Hola soy un SMS desde Node.js!',
        from: '+',
        to: '+'
    })
        console.log(message)
    } catch (error) {
        console.log(error)
    }
})()


const options = {
    body: 'Hola soy un WSP desde Node.js!',
    mediaUrl: [ 'https://www.chetu.com/img/twilio/partner/twilio-logo.png' ],
    from: 'whatsapp:+19788309704',
    to: 'whatsapp:+5493518081934'
 }

 ;( async () =>{
    try {
        const message = await client.messages.create(options)
        console.log(message)
    } catch (error) {
        console.log(error)
    }
})()
*/

//****Configuración del puerto del servidor****//

const PORT = process.env.PORT || 8080

const server = app.listen(PORT,()=> {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
});
server.on('Ocurrió un error ', error => console.log(error));
    
    
