import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Items from './Items'




function Menu (props) {
    const [menu, setMenu ]= useState([]);
    useEffect(()=> {
        axios.get('/api/menu')
        .then(res => {
            console.log("res.data", res.data)
            setMenu(res.data)
     })
        .catch(err => console.log(err))

        console.log('menu', menu)

    }, [])
    
    const itemList = menu.map(e => {
        return (
            <Items 
            key={e.item_id} 
            item_name={e.item_name}r
            price={e.price}
            picture_url={e.picture_url}
            />
            )
    })
    
    console.log('items', menu)
        
    return (
    <div>
        Look at our good food!
        <Link to='/Order'><button>Your Order</button></Link>
        <br/>
        {itemList}
    </div>)
}

export default Menu;