
const { createTransport } = require('nodemailer');
const { info } = require('winston');

//********************Mail******************* */

const TEST_MAIL = 'aidines.espinoza@gmail.com'

const transporter = createTransport({
   service: 'gmail',
   port: 587,
   auth: {
       user: 'aidysteicy@gmail.com',
       pass: 'lbrgzhzovmleldvh'
   }
})

const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    attachments: [
        {
            path: 'https://raw.githubusercontent.com/andris9/Nodemailer/master/assets/nm_logo_200x136.png'
        }
    ]
}

async function mandarMail(asunto, option) {
    try {
        const html = `<div>Ifo del nuevo usuario: 
        <h3>nombre:${option.email}</h3>,
        <h3>nombre: ${option.nombre}</h3>,
        <h3>direcion: ${option.direccion}</h3>,
        <h3>telefono: ${option.telefono}</h3> </div>`
        const info = await transporter.sendMail({...mailOptions, subject: asunto, html: html})
        logger.info(info)
     } catch (error) {
        logger.error(error)
     }
}

module.exports = mandarMail