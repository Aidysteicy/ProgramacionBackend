const express =require('express')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const logger = require('morgan')
const session = require('express-session')
const MongStore = require('connect-mongo');
const handlebars = require('express-handlebars')
const indexRouter = require('./routes/index.js')

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('views', './views')
app.set('view engine', 'hbs')

const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

app.use(logger('dev'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: MongStore.create({mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`, mongoOptions: mongoConfig })
}))
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIES_SECRET))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(indexRouter)

module.exports = app