import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import './Menu.css'

function Items (props) {

    const handleClick = () => {
        if(props.loggedIn && props.hasOrder){
            axios.put('/api/item',{orderId: props.orderId, itemId: props.itemId})
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err)) 
        }
    }

    return (
        <div>
            <h2>{props.item_name}<span> ${props.price}</span></h2>
            <img className='menu-img' onClick={handleClick} src={props.picture_url} 
            alt={`${props.item_name}`} />
        </div>
    )
}

function mapStateToProps(reactState) {
    const { userName, orderId } = reactState
    return { userName, orderId }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Items) 