
const initialState = {
    location: {name: "Choose Location", lat: 40.418437, lng: -111.819107},
    userName: '',
    orderId: 0,
    user: {}
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';
const UPDATE_ORDER = 'UPDATE_ORDER';
const UPDATE_LOCATION = 'UPDATE_LOCATION'
const CLEAR_ORDER = 'CLEAR_ORDER'

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

export function updateOrderId(orderId) {
    return {
        type: UPDATE_ORDER,
        payload: orderId
    }
}

export function clearOrderId() {
    return {
        type: CLEAR_ORDER,
        payload: 0
    }
    
}

export function updateLocation(location) {
    return {
        type: UPDATE_LOCATION,
        payload: location
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
        case UPDATE_LOCATION:
            return { ...state, location: payload}
        case CLEAR_ORDER:
            return { ...state, orderId: payload}
        default: 
            return state
    }

}