require('dotenv').config();
const cors = require('cors')
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const path = require('path')
const{ PORT, DATABASE_URL} = process.env
const SESSION_SECRET = process.env.SESSION_SECRET || "SessionSecret"

const authCtrl = require('./controllers/authController')
const menuCtrl = require('./controllers/mainController')
const stripeCtrl = require('./controllers/stripeController')

//Set up
const app = express();
// const dev = app('env' !== 'production')///////rs



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


app.disable('x-powered-by')//////
app.use(express.static(path.join(__dirname, '../build')));

// if(!dev){//////
//     app.use(express.static(path.resolve(__dirname, 'build')))  ///////
//     app.get('*', (req, res) => {///////
//         res.sendFile(path.join(__dirname + '/build/index.html'))/////
//     })///////
// }////////

massive(DATABASE_URL).then(db => {
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
app.delete('/api/item/:order_id/:item_id', menuCtrl.removeItem)

// used to process payments using stripe
app.get("/", (req, res) => {
    res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});
app.post('/api/checkout', stripeCtrl.checkout)


// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}

const port = PORT;///////changed from const port = SERVER_PORT
app.listen( port, () => console.log(`Server on ${port}`))
