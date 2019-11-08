import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "axios"
import {updateOrderId} from '../../Reducer/reducer'
import OrderItem from './OrderItem'

function Order (props) {
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
        axios.get(`/api/order/${2}`)////set 2 to props.orderId
        .then(res => { 
            console.log('res.data', res.data) 
            setOrder(res.data)
        }).catch(err => console.log(err))
    }

    const setQuantity = (orderId, itemId, number) => { /// function gets passed down to OrderItem
        if(number < 1){
            console.log("nope")
                /// and delete item function
        } else {
            axios.put('/api/item-q', {
                order_id: orderId, 
                item_id: itemId, 
                quantity:number })
            .then (res => {
                getOrder()
            }).catch(err => console.log(err))
        }
    }

    let orderToDisplay = "you don't have anything on your order"
    if(order[0] !== undefined){
        orderToDisplay = order.map((e,i) => {
            return <OrderItem item={e} 
                            key={`Order Item ${i}`} 
                            setQuantity={setQuantity}/>
        })
    }

    return (
    <div>
        The food you have ordered
        <Link to='/menu'><button>Add More</button></Link>
        <Link to='/checkout'><button>Checkout</button></Link>
        
        {orderToDisplay}

        <h3>{`the Price of your order is $${total}`}</h3>
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