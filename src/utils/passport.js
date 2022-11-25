const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const ContenedorMongo = require('../contenedores/contenedorMongo.js')
const model = require('../models/usuarios.js')
const Users = new ContenedorMongo(model)
//const isValidPassword = require('./validarPassword')

function isValidePassword(user, password){
    console.log(bcrypt.compareSync(password, user.password))
    return bcrypt.compareSync(password, user.password)
}

function createHash (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

passport.use('login', new LocalStrategy(
    async (username, password, done)=>{
        const user = await Users.getbyField({email: username})
        if (user=='nok' || user.length==0) {
            return done(null, false, { message: `User ${username} not found` })
        }
         if (!isValidePassword(user[0], password)) {
             return done(null, false, { message: 'Password incorrect' })
         }
       /* if (user[0].password !== password) {
            return done(null, false, { message: 'Password incorrecto' })
        }    */       
        done(null, user[0])
    }
))

passport.use('signup', new LocalStrategy(
    {passReqToCallback: true},
    async (req, username, password, done)=>{
        let user = await Users.getbyField({email: username})
        if(user.length!==0){
            return done(null, false, {message: `User ${username} already exists`})
        }
        const newUser = {
            email: username,
            password: createHash(password),
        }
        const guardar = await Users.save(newUser, 'usuarios')
        if(guardar=='ok'){
            user = await Users.getbyField({email: username})
        }
        return done(null, user[0])
    }
))

passport.serializeUser((user, done) =>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done) =>{
    const user = await Users.getbyField({_id: id})
    done(null, user)
})

module.exports = passport