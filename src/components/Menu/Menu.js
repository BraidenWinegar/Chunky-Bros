import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateOrderId } from '../../Reducer/reducer'

import Items from './Items'




function Menu (props) {
    const [menu, setMenu ]= useState([]);
    const [hasOrder, setHasOrder]= useState(false)
    
    useEffect(()=> {
        let user_id = 0;
        axios.get('/api/menu') ///get menu for items
        .then(res => { setMenu(res.data) })
        .catch(err => console.log(err))
        if(props.orderId) {    //check if order has been made makes a new order if false
            setHasOrder(true)
        } else {
            if(props.userName)
                user_id = props.user.user_id
            axios.post(`/api/order/${user_id}`)
            .then(res => {
                props.updateOrderId( res.data.order_id[0].order_id )
            }).catch(err => console.log(err))
        }
    }, [])

    
    const itemList = menu.map(e => {
        return (
            <Items 
            key={`item ${e.item_id}`}
            item_id={e.item_id} 
            item_name={e.item_name}r
            price={e.price}
            picture_url={e.picture_url}
            userName={props.userName}
            hasOrder={hasOrder}
            />
            )
    })
    return (
    <div>
        Look at our good food!
        <Link to='/Order'><button>Your Order</button></Link>
        <br/>
        {itemList}
    </div>)
}

function mapStateToProps(reactState) {
    const {  userName, orderId, user } = reactState
    return { userName, orderId, user }
}

const mapDispatchToProps = {
    updateOrderId
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)