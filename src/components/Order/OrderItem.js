import React, {useState, useEffect} from 'react'


function OrderItem(props) {
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        console.log(props.item)
        setQuantity(props.item.quantity)
    }, [props.item])

    function increment() {
        setQuantity(quantity + 1)
    }

    function decrement() {
        setQuantity(quantity - 1)
    }



    return (
        <div>
            <h3>{props.item.item_name} </h3>
            <div>
                <button class onClick={decrement}>-</button>
                <span className='order-words'>{quantity}</span>
                <button onClick={increment}>+</button> 
            </div>

            <button onClick={() => {props.setQuantity(props.item.order_id, 
                                                    props.item.item_id,
                                                    quantity)}}
            >Enter Number</button>
            
        </div>
    )
}

export default OrderItem