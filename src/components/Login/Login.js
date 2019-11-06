import React from 'react' 
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useForm} from '../../hooks/useForm'
import {connect} from 'react-redux'
import {updateUser} from '../../Reducer/reducer'

function Login(props) {
    const login = () => {

        axios.post('/auth/login', 
        {username: state.username, password: state.password})
        .then(res => {
            props.updateUser(res.data)
            props.history.go(-1)
        })
        .catch(err => console.log(err))
    }
    
    const {state, handleChange, handleSubmit, errors} = useForm(login)
    
    return (
        <div>
        <form noValidate onSubmit={handleSubmit} >
            <div>
                <label> Username</label>
                <div>
                    <input name='username' 
                           type='text'  
                           value={state.username} 
                           onChange={handleChange}
                           className={`${errors.username && "inputError"}`}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
            </div>
            <div>
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
            <button type="submit" on>submit</button>
            {errors.test}
        </form>

        <div>
            Don't have an account? make one <Link to='register'>Here</Link>
        </div>
        </div>
    )
}

const mapDispatchToProps = {
    updateUser
}

export default connect(null, mapDispatchToProps)(Login);