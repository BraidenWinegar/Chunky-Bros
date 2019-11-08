        import React, {useState} from 'react'
        import {Link} from 'react-router-dom'
        import StripeCheckout from "react-stripe-checkout"
        import axios from 'axios'

        
        function Checkout (props) {
            const [thisOrder] = useState({
                Name: 'hamburger',
                price: 100,
                description: `enough meat to fatten a`
            })

            async function handleToken (token) {
                const res = await axios.post('/api/checkout', { ///body
                    token, thisOrder
                })
                const {status} = res.data;
                console.log(status)
            }

            return (
                <div>
                    <Link to='/menu'><button>Add More</button></Link>

                    <StripeCheckout
                        stripeKey="pk_test_pljD7GkjHnCFt7AhcHUJ0xtT00FSjgFjWD"
                        token={handleToken}
                        amount={thisOrder.price * 100}
                        name="Yummy Food"
                        billingAddress
                    />
                </div>
            )
                
        }
        export default Checkout