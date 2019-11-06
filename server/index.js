require('dotenv').config();
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const{SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const authCtrl = require('./controllers/authController')
const menuCtrl = require('./controllers/mainController')


const app = express()

//topLevel middleware
app.use(express.json())
app.use(session({
    resave:false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 3600000
    }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
})

//// auth controller endpoints
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.post('/auth/logout', authCtrl.logout)
app.post('/auth/user', authCtrl.getUser)

/// Menu controller endpoints
app.get('/api/menu', menuCtrl.getMenu)
app.get('/api/item/:item_id', menuCtrl.getItem)
app.post('/api/order/:user_id', menuCtrl.addOrder)
app.post('/api/order-item', menuCtrl.addOrderAndItem)
app.get('/api/order/:order_id', menuCtrl.getOrder)
app.put('/api/item', menuCtrl.addItem)
app.delete('/api/item', menuCtrl.removeItem)





app.listen(SERVER_PORT, () => console.log(`Server on ${SERVER_PORT}`))