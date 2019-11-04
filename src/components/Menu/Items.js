import React from 'react'
import './Menu.css'


function Items (props) {
    console.log('on items')

    return (
        <div>
            <h2>{props.item_name}<span>   ${props.price}</span></h2>
            <img className='menu-img' src={props.picture_url} 
            alt={` ${props.item_name}`} />
        </div>
    )
}

export default Items