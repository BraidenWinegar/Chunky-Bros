        import React, {useState} from 'react'
        import {Link} from 'react-router-dom'
        import {connect} from 'react-redux'
        import {updateLocation} from '../Reducer/reducer'
        import StripeCheckout from "react-stripe-checkout"
        import Selector from './Maps/Selector'
        import axios from 'axios'

        const locations = [{
            name: 'Lehi',
            lat: 40.438473, 
            lng: -111.892520
        },{
            name: 'Orem',
            lat: 40.296499,  
            lng: -111.701905
        },{ 
            name: 'Draper',
            lat: 40.527182, 
            lng: -111.877191
        }]
        
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

            function handleSelection(loc) {   /// loc stands for location
                props.updateLocation(loc)
            }

            return (
                <div>
                    <Link to='/menu'><button>Add More</button></Link>

                    <StripeCheckout
                        stripeKey="pk_test_pljD7GkjHnCFt7AhcHUJ0xtT00FSjgFjWD"
                        token={handleToken}
                        amount={thisOrder.price * 100}
                        name="Your Order"
                        billingAddress
                    />

                    <Selector locations={locations} 
                        handleSelection={handleSelection} 
                        selected={props.location} 
                    />
                </div>
            )
                
        }
        
        
        function mapStateToProps(reactState) {
            const {  location } = reactState
            return { location }
        }
        
        const mapDispatchToProps = {
            updateLocation
        }
        
        export default connect(mapStateToProps, mapDispatchToProps)(Checkout) 