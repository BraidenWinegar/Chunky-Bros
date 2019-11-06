import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateOrderId } from '../../Reducer/reducer'

import Items from './Items'




function Menu (props) {
    const [menu, setMenu ]= useState([]);
    const [hasOrder, setHasOrder] = useState(false)
    
    useEffect(()=> {
        axios.get('/api/menu')
        .then(res => {
            setMenu(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    

    useEffect(()=> {
        console.log(props.orderId)
        if( props.orderId ) {
            setHasOrder(true)
        } else {
            
        }
    },[])

    


    
    const itemList = menu.map(e => {
        return (
            <Items 
            key={`item ${e.item_id}`}
            item_id={e.item_id} 
            item_name={e.item_name}r
            price={e.price}
            picture_url={e.picture_url}
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
    const {  orderId } = reactState
    return { orderId }
}

const mapDispatchToProps = {
    updateOrderId
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)