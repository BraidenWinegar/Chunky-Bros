import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Landing'
import Menu from './components/Menu/Menu'
import Order from './components/Order/Order'
import Checkout from './components/Checkout'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Account from './components/Account'
import MapWrapper from './components/Maps/MapWrapper'



export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/menu' component={Menu} />
        <Route path='/order' component={Order} />
        <Route path='/Checkout' component={Checkout} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/account' component={Account} />
        <Route path='/maps' component={MapWrapper} />
    </Switch>
)