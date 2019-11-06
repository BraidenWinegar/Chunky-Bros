import axios from 'axios'


const initialState = {
    location: '',
    userName: '',
    oderId: 0,
    user: {},
    hasOrder: false
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';
const UPDATE_ORDER = 'UPDATE_ORDER'

export function updateUser(userObj) {
    return{
        type: UPDATE_USER,
        payload: userObj
    }
}

export function clearUser() {
    return {
        type: CLEAR_USER,
        payload: ''
    }
}


export const addOrder = (user) =>   ////currently not using
{
    const order = axios.post(`/api/order/${user && user.user_id}`)
            .then(res => res.data)
            .catch(err => console.log(err))
    console.log('order in reducer', order)
    updateOrderId(1)
    return (order)
}

export function updateOrderId(orderId) {
    return {
        type: UPDATE_ORDER,
        payload: orderId
    }
}



export default function reducer (state = initialState, action) {
    const {type, payload} = action
    // console.log('reducer', state, action)
    switch(type){
        case UPDATE_USER:
            console.log(state)
            return { ...state, userName:payload.username, user:payload }
        case CLEAR_USER:
            return { ...state, userName:payload, user:payload }
        case UPDATE_ORDER:
            return { ...state, oderId:payload } 
        default: 
            return state
    }

}