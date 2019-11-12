import React from 'react'
import {Link} from 'react-router-dom'
// import '../App.css'


function Landing (props) {

    return (
    <div className='directing-words'>
        <p className='directing-words'>Our food is delicious!</p>
       <p className='directing-words'>Order Now!</p> 
        <Link to='/menu'><button>Menu</button></Link>
        <img className='store-display' 
            alt='Most attractive restaurant with attractive people' 
            src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80' 
        />
        <img className='store-display' 
            alt='Most attractive restaurant with attractive people' 
            src='https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80' />

    </div>)
}

export default Landing;