import { lOGOUT, SINGIN, UPDATEAVATAR } from "./ActionTypes"

const initialState = null;

const Usuario = (state = initialState, action) => {
    switch (action.type) {
        case SINGIN: {
            return {
              ...action.payload
            }
        }
        case lOGOUT: {
            return initialState
        }
        case UPDATEAVATAR: {
            console.log(action.payload)
            state.avatar = action.payload
            return state
        }
        default: {
            return state;
        }
    }
}

export default Usuario