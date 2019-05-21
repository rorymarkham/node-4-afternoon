require('dotenv').config()
const express = require('express') 
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./Controllers/swagController')
const authController = require('./Controllers/authController')
const cartController = require('./Controllers/cartController')
const searchController = require('./Controllers/searchController')

const app = express()

let {SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', swagController.read)

app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

app.get('/api/search', searchController.search)

app.listen(SERVER_PORT, () => {
    console.log(`theres a snake in my boot on ${SERVER_PORT}`)
})