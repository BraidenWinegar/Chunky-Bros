import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'




function Order (props) {



    return (
    <div>
        The food you have ordered
        <Link to='/menu'><button>Add More</button></Link>
        <Link to='/checkout'><button>Checkout</button></Link>

    </div>)
} 

function mapStateToProps(reactState) {
    const { location, userName } = reactState
    return { location, userName }
}

export default connect(mapStateToProps, null)(Order)