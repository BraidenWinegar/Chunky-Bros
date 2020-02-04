import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "axios"
import {updateOrderId} from '../../Reducer/reducer'
import OrderItem from './OrderItem'
import './Order.css'

function Order(props) {
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

    function getOrder () {  
        axios.get(`/api/order/${props.orderId}`)  /// adjust db 
        .then(res => { 
            setOrder(res.data)
        }).catch(err => console.log(err))
    }

    const setQuantity = (orderId, itemId, number) => { /// function gets passed down to OrderItem
        if(number < 1){
            axios.delete(`/api/item/${orderId}/${itemId}`
            ).then (() => {
                getOrder()
            }).catch(err => console.log(err))

        } else {
            axios.put('/api/item-q', {
                order_id: orderId, 
                item_id: itemId, 
                quantity:number 
            }).then (() => {
                getOrder()
            }).catch(err => console.log(err))
        }
    }

    let orderToDisplay = <h2 id='message'>you don't have anything on your order</h2>
    if(order[0] !== undefined){
        orderToDisplay = order.map((e,i) => {
            return <OrderItem item={e} 
                            key={`Order Item ${i}`} 
                            setQuantity={setQuantity}/>
        })
    }

    return (
    <div>
        <p className='order-words'>The food you have ordered</p>
        <Link to='/menu'><button className='order-button'>Add More</button></Link>
        <Link to='/checkout'><button className='order-button'>Checkout</button></Link>
        <div id='order-container'>
            {orderToDisplay}
        </div>

        <h3>{order[0] && `the Price of your order is $${total}`}</h3>
    </div>)
    
} 

function mapStateToProps(reactState) {
    const { orderId } = reactState
    return { orderId }
}

const mapDispatchToProps = {
    updateOrderId
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)