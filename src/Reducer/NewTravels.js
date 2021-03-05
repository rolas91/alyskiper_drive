import { DELETEITEMTRAVEL, ADDITEMTONEWTRAVEL, EDITITEMTRAVEL } from "./ActionTypes"

const initialState = null

const NewTravels = (state = initialState, action) => {
    switch (action.type) {
        case ADDITEMTONEWTRAVEL: {
            return {
                ...state,
                ...action.payload
            }
        }
        case EDITITEMTRAVEL: {
            return {
                ...state,
                ...action.payload
            }
        }
        case DELETEITEMTRAVEL: {
            return initialState
        }
        default: {
            return state;
        }
    }
}

export default NewTravels