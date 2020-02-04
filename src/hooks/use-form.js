import {useState, useEffect} from 'react';


export const useForm (callBack) => {
    /// takes in a callback function that is called when form is submitted
    /// returns 
    ///     value of input(state for the input box so it can hold value )
    ///     error (string of text for display under input box)
    ///     a handleChange function for input value
    ///     a handleSubmit function that calls the callback  



    const [state, setState] =  useState('')
    const [errors, setErrors] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)





    const handleSubmit = event => {   //// if onSubmit is oustide possibly passes in validate
        event.preventDefault();
        setErrors(validate(state));
        setIsSubmitting(true);
    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting){
            callback()
        }
    }, [errors, isSubmitting])




    const handleChange = event => {
        setState(event.target.value)
    }
}