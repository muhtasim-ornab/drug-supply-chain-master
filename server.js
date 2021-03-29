require('dotenv').config()

const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDbStore = require('connect-mongo')
const flash = require('express-flash')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')




//------------DataBase Connection----------------
const connectDB = require('./app/config/db')
connectDB()

//------------Delete Files------------------
const fetchData = require('./script')
fetchData()


// -------------- Session Store ----------
let mongoStore = new MongoDbStore({
    mongoUrl: process.env.MONGO_CONNECTION_URL,
    dbName: "supplyChain",
    stringify: false,
})

//--------------Cors------------------
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}
app.use(cors(corsOptions))


//---------------Session Config--------------
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000* 60 * 60 *24} //24hours
    //cookie: {maxAge: 1000 * 10} //10 seconds
}))



app.use(flash())
//---------------Log Requests----------------
app.use(morgan('tiny'))


//---------------Assets----------------
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

// --------------- Passport Config ---------
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session()) 

//---------------GLobal Middleware-----------
app.use((req, res, next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//require('./routes/api')(app)
require('./routes/web')(app)
app.use('/api/drug', require('./routes/api'))
// app.use('/files/download', require('./routes/download'))
// app.use('files', require('./routes/show'))


//---------------Set Template Engine----------------
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


const PORT = process.env.PORT || 3040
app.listen(3040, '0.0.0.0', ()=>{
    console.log(`Listening on port ${PORT}`)
})