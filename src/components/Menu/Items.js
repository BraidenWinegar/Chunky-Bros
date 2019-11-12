import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import './Menu.css'

function Items (props) {



    const handleClick = () => {
        console.log('hit')
        if(props.orderId){
            console.log('slap', props.item_id)
            axios.put('/api/item',{order_id: props.orderId, item_id: props.item_id})
            .then(res => {
                console.log("res.data", res.data)
            })
            .catch(err => console.log(err)) 
        }
    }

    return (
        <div>
            <h2>{props.item_name}<span> ${props.price}</span></h2>
            <Link to='/order'>
                <img className='menu-img' 
                    onClick={handleClick} 
                    src={props.picture_url} 
                    alt={`${props.item_name}`} 
                />
            </Link>
        </div>
    )
}

function mapStateToProps(reactState) {
    const { userName, orderId } = reactState
    return { userName, orderId }
}


export default connect(mapStateToProps, null)(Items) 