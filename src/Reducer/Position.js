import { ASIGNARPOSITION } from "./ActionTypes"

const initialState = null

const Position = (state = initialState, action) => {
    switch (action.type) {
        case ASIGNARPOSITION: {
            return {
                ...state,
                ...action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default Position