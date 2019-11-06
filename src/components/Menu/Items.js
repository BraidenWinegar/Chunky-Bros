import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateOrderId } from '../../Reducer/reducer'
import './Menu.css'


function Items (props) {
    



    const handleClick = () => {
        if (true){
            console.log('logged out')
            
        }else if(props.orderId === 0 || props.orderId === undefined){

            axios.post(`/api/order/${props.user && props.user.user_id}`)
            .then(res => {
                
            })
            .catch(err => console.log(err))
        } else {
            // axios.put('/api/item',{orderId: props.orderId, itemId: props.key})
            // .then(res => {
                
            // })
            // .catch(err => console.log(err)
        }

    }

    return (
        <div>
            <h2>{props.item_name}<span>   ${props.price}</span></h2>
            <img className='menu-img' onClick={handleClick} src={props.picture_url} 
            alt={`${props.item_name}`} />
        </div>
    )
}

function mapStateToProps(reactState) {
    const {  orderId } = reactState
    return { orderId }
}

const mapDispatchToProps = {
    updateOrderId
}

export default connect(mapStateToProps, mapDispatchToProps)(Items) 