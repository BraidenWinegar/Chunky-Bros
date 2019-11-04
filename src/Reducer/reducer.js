

const initialState = {
    location: '',
    userName: '',
    oderId: 0
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';

export function updateUser(userObj) {
    console.log('updateUser', userObj)
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


export default function reducer (state = initialState, action) {
    const {type, payload} = action
    console.log('reducer', state, action)
    switch(type){
        case UPDATE_USER:
            return { ...state, userName:payload }
        case CLEAR_USER:
            return { ...state, userName:payload }
        default: 
            return state
    }

}