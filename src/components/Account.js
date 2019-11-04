import React, {useState, useEffect} from "react"
import {connect} from 'react-redux'
import axios from 'axios'
import clearUser from '../Reducer/reducer'

function Account(props) {
   
    const [info, setInfo] = useState({})

    useEffect(() => {
        axios.post('/auth/user')
        .then(user => {
            console.log(user.data)
            setInfo(user.data)
            console.log('info', info)
        })
        .catch(err => console.log(err))
    }, [])

    function handleLogout (){
        axios.post('/auth/logout')
        .then( () => {
            props.history.push('/')
        })
    }


    return(
        <section>
            <h1>{ info.username || 'no user'}</h1>
            <h2>Email:{info.email}</h2>
            <h2>Phone:{info.phone_number}</h2>
            <h2>Award Points:{info.award_points}</h2>
            <h2>last location:{info.last_location}</h2>{/* </h2> need to alter to show the location name not location id  */}
            
            <button onClick={handleLogout}>Logout</button>
        </section>
    )
}

const mapDispatchToProps = {
    clearUser
}

function mapStateToProps(reactState) {
    const { location, userName } = reactState
    return { location, userName }
}

export default connect(mapStateToProps, null)(Account) 