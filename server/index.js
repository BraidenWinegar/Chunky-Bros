require('dotenv').config();
const cors = require('cors')
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const{ SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env


const authCtrl = require('./controllers/authController')
const menuCtrl = require('./controllers/mainController')
const stripeCtrl = require('./controllers/stripeController')


const app = express()

//topLevel middleware
app.use(express.json())
app.use(cors())
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

app.get('/api/order/:order_id', menuCtrl.getOrder)
app.put('/api/item', menuCtrl.addItem)
app.put('/api/item-q', menuCtrl.setQuantity)
app.delete('/api/item', menuCtrl.removeItem)

// used to process payments using stripe
app.get("/", (req, res) => {
    res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
  });
app.post('/api/checkout', stripeCtrl.checkout)


app.listen(SERVER_PORT, () => console.log(`Server on ${SERVER_PORT}`))