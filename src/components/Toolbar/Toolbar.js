import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Toolbar.css'

function Toolbar(props) {
    /// Component that makes a nav bar on top of paige
    /// will have links to several pages [landing, menu, maps]
    /// and the last link will change based on username in redux
    /// the last 2 links will have different titles below the links change based on values in redux

    
    const mapTitle = (props.location) ? props.location : 'Choose Location'
    const userName = (props.userName) ? props.userName : 'Login'

    return(
        <header>
            <Link id='logo' to='/'>
                <div >Logo</div>
            </Link>
            
            <nav>
                <Link to='/menu'>
                    <div className='nav_div'>
                        <img id='menu-img' className='nav-img' alt='Hamburger Icon' src='https://cdn0.iconfinder.com/data/icons/food-84/100/food-burger-2-512.png' />
                        Menu
                    </div>
                </Link>
                <Link to='/maps'>
                    <div className='nav_div'>
                        <img className='nav-img' alt='map pin Icon' src='https://cdn1.iconfinder.com/data/icons/cloud-14/32/location_locate_google_custom_pin_search-512.png' />
                        {mapTitle}
                    </div>
                </Link>
                <Link to={props.userName ? '/account' :'/login' }>
                    <div className='nav_div'>
                        <img className='nav-img' alt='user icon' src='https://cdn3.iconfinder.com/data/icons/random-icon-set/512/user-512.png' />
                        {userName}
                    </div>
                </Link>
            </nav>
        </header>
    )    //////   extended menu could include Register and Cart /// 
}

function mapStateToProps(reactState) {
    const { location, userName } = reactState
    return { location, userName }
}

export default connect(mapStateToProps, null)(Toolbar)