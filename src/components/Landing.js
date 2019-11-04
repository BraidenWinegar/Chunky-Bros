import React from 'react'
import {Link} from 'react-router-dom'


function Landing (props) {

    return (
    <div>
        Our food is delicious.
        Order Now!
        <Link to='/menu'><button>Menu</button></Link>
    </div>)
}

export default Landing;