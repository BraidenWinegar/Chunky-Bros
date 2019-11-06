import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "axios"
import {updateOrderId} from '../Reducer/reducer'




function Order (props) {
    const [order, setOrder] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        if (props.userName) {
            setLoggedIn(true)
            if ( props.orderId == undefined ){
                axios.post(`/api/order/${props.user && props.user.user_id}`)
                .then(res => {
                    setOrder(res.data.order)         ///res.data = {order_id: #, order: []}
                    console.log('res.data.', res.data)
                    props.updateOrderId(res.data.orderId)
                })
                .catch(err => console.log(err))
            } else {
                // axios.get(`/api/order/${props.orderId}`)
            }
        } else {
            console.log('falsy')
        }
    },[])

    

    if (loggedIn){
        let orderToDisplay = "you don't have anything on your order"
        console.log(order[0])
        if(order[0] !== undefined){
            orderToDisplay = order[0]
        }

        return (
        <div>
            The food you have ordered
            <Link to='/menu'><button>Add More</button></Link>
            <Link to='/checkout'><button>Checkout</button></Link>
            <h1>{orderToDisplay}</h1>
        </div>)
    } else {
        return(
            <div>
                <h2>you are not logged in</h2>
                <h3>Log in <Link to='/login'>Here</Link></h3>
                <p>{console.log('props' ,props.addOrder)}</p>
            </div>
        )
    }

} 

function mapStateToProps(reactState) {
    const { location, userName, orderId, user } = reactState
    return { location, userName, orderId, user }
}

const mapDispatchToProps = {
    updateOrderId
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)