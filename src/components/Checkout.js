import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateLocation, clearOrderId} from '../Reducer/reducer'
import StripeCheckout from "react-stripe-checkout"

import Selector from './Maps/Selector'
import axios from 'axios'

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure()

const locations = [{
    name: 'Lehi',
    lat: 40.438473, 
    lng: -111.892520
},{
    name: 'Orem',
    lat: 40.296499,  
    lng: -111.701905
},{ 
    name: 'Draper',
    lat: 40.527182, 
    lng: -111.877191
}]

function Checkout (props) {
    console.log('props', props)

    const [thisOrder] = useState({
        Name: 'hamburger',
        price: 100,
        description: `enough meat to fatten a ox`
    })

    const [order, setOrder] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        getOrder()
    },[]) 

    useEffect(() => {
        order[0] && setTotal(order.reduce((acc, e) => 
            acc + (e.price * e.quantity)
        , 0)
    )},[order])

    function getOrder() {  
        axios.get(`/api/order/${props.orderId}`)  
        .then(res => { 
            setOrder(res.data)
        }).catch(err => console.log(err))
    }

    async function handleToken (token) {
        const res = await axios.post('/api/checkout', { ///body
            token, thisOrder: {
                Name: 'food', 
                price: total, 
                description: 'enough meat to fatten a ox'}
        })
        const {status} = res.data;
        console.log(status)
        if(status === 'success'){
            toast('Success! Check email for details', { type: 'success' });
            props.clearOrderId()
            // props.history.push('/')
        } else {
            console.log('hit error')
            toast('Something is incorrect', {type: 'error'})
        }

    }

    function handleSelection(location) {  
        props.updateLocation(location)
    }

    ///// logic on what to display
    let pickupLocation = ( props.location.name === "Choose Location") ?
    <h4>Choose a location with the button bellow</h4> :
    <h4>Your location to pick up is:</h4>

    let bill =(total) ? <h3>Your total is ${total}</h3> : <div></div>

    let displayStripeButton = (total < 1) ? <h2 id='message'>Must add order to checkout</h2>
    : ( props.location.name === "Choose Location") ? <h2 id='message'>Must choose a location to checkout</h2> 
    : <StripeCheckout
                stripeKey="pk_test_pljD7GkjHnCFt7AhcHUJ0xtT00FSjgFjWD"
                token={handleToken}
                amount={total * 100}
                name="Your Order"
                billingAddress
            />

    return (
        <div>
            <Link to='/menu'><button>Add More</button></Link>

            {pickupLocation}
            <Selector locations={locations} 
                handleSelection={handleSelection} 
                selected={props.location} 
            />

            {bill}
            {displayStripeButton}
        </div>
    )     
}

function mapStateToProps(reactState) {
    const { location, orderId } = reactState
    return { location, orderId }
}

const mapDispatchToProps = {
    updateLocation, clearOrderId
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout) 