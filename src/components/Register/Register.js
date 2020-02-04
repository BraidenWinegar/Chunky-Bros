import React, {useState} from 'react'
import {useForm} from '../../hooks/useForm'
import axios from 'axios'
import {connect} from 'react-redux'
import {updateUser} from '../../Reducer/reducer'
import './Register.css'


function Register (props) {
    const [taken, setTaken] = React.useState(false)

    const submit  = () => {  ///need changes
        axios.post('/auth/register', { username: state.username, email: state.email, 
            password: state.password, phone_number: state.phoneNumber})
        .then(res => {
            props.updateUser(res.data)
            props.history.push('/')
        })
        .catch(err => {
            console.log(err)
            setTaken(true);
        })
    }

    var {state, handleChange, handleSubmit, errors} = useForm(submit)

    return (
        <form noValidate onSubmit={handleSubmit}>
            <div className='inputs'>
                <label>Username</label>
                <div>
                    <input name='username' 
                           type='text'  
                           value={state.username} 
                           onChange={handleChange}
                           className={`${(errors.username || taken) && "inputError"}`}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                    {taken && <p className='error'>Username is taken</p>}
                </div>
            </div>
            <div className='inputs'>
                <label>Email</label>
                <div>
                    <input name='email' 
                           type='email' 
                           value={state.email} 
                           onChange={handleChange}
                           className={`${errors.email && "inputError"}`}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
            </div>
            <div className='inputs'>
                <label>Password</label>
                <div>
                    <input name='password' 
                           type='password'
                           value={state.password} 
                           onChange={handleChange}
                           className={`${errors.password && "inputError"}`}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
            </div>
            <div className='inputs'>
                <label>Phone Number</label>
                <div>
                    <input name='phoneNumber' 
                           type="tel"
                           value={state.phoneNumber} 
                           onChange={handleChange}
                           className={`${errors.phoneNumber && "inputError"}`}
                    />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                </div>
            </div>
            <button type="submit" on>Submit</button>
        </form>
    )
}

const mapDispatchToProps = {
    updateUser
}

export default connect(null, mapDispatchToProps)(Register);