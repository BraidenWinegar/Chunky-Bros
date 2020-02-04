import React from 'react' 
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useForm} from '../../hooks/useForm'
import {connect} from 'react-redux'
import {updateUser} from '../../Reducer/reducer'

function Login(props) {
    
    const [loginError, setLoginError] = React.useState(<p></p>)
    
    
    const login = () => {
        axios.post('/auth/login', 
        {username: state.username, password: state.password})
        .then(res => {
            props.updateUser(res.data)
            props.history.go(-1)
        })
        .catch(err => {
            setLoginError(<h2 id='login-err'>Incorrect username or password</h2>)
        })
    }
    let {state, handleChange, handleSubmit, errors} = useForm(login)

    return (
        <div>
            {loginError}
        <form noValidate onSubmit={handleSubmit} >
            <div className='inputs'>
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
            <button type="submit" on>submit</button>
            {errors.test}
        </form>

        <div>
            <h3>Don't have an account? make one</h3> <Link to='register'><span className='to-register'>Here!</span></Link>
        </div>
        </div>
    )
}

const mapDispatchToProps = {
    updateUser
}

export default connect(null, mapDispatchToProps)(Login);