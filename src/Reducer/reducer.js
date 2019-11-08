import axios from 'axios'


const initialState = {
    location: '',
    userName: '',
    oderId: 0,
    user: {}
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
    const action = {
        type: CLEAR_USER,
        payload: ''
    }
    console.log (action)
    return action
}

export function updateOrderId(orderId) {
    return {
        type: UPDATE_ORDER,
        payload: orderId
    }
}

export default function reducer (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case UPDATE_USER:
            return { ...state, userName:payload.username, user:payload }
        case CLEAR_USER:
            return { ...state, userName:payload, user:payload }
        case UPDATE_ORDER:
            return { ...state, orderId: payload } 
        default: 
            return state
    }

}