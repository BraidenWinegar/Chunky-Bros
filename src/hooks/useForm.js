import {useState, useEffect} from 'react';

export const useForm = callback => {
    const [state, setState] =  useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: null
    })
    const [errors, setErrors] = useState({

    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = event => {
        setState({
            ...state, [event.target.name]: event.target.value 
        })
    }

    function validate (values) {
        const errors = {};

        if (!values.username){
            errors.username = "must enter a username"
        } else if (values.username.length < 3) {
            errors.username = "Username needs to be more than 3 characters";
        }

        // if (!values.email){
        //     errors.email =  'Must enter Email'
        // } else   not needed and threw errors in login
        if (!/\S+@\S+\.\S+/.test(values.email) && values.email !== ''){
            errors.email = 'Invalid Email address'
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 2) {
            errors.password = "Password needs to be more than 2 characters";
        }

        if(isNaN(values.phoneNumber)) {
            errors.phoneNumber = 'can only accept numbers example (555) 555-5555'
        } else if (values.phoneNumber !== null 
            && values.phoneNumber.length !== 10 
            && values.phoneNumber.length !== 0) {
            errors.phoneNumber = 'can only accept 10 digit numbers'
        }
        return errors
    }

    const handleSubmit = event => {
        event.preventDefault();
        setErrors(validate(state));
        setIsSubmitting(true);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting){
            callback()
        }
    }, [errors, isSubmitting])

    return {
        state,
        errors,
        handleChange,
        handleSubmit
    }
}