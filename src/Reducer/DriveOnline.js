import { DISCONET, CONECT } from "./ActionTypes"

const initialState = false;

const DriveOnline = (state = initialState, action) => {
    switch (action.type) {
        case CONECT: {
            return action.payload
        }
        case DISCONET: {
            return initialState
        }
        default: {
            return state;
        }
    }
}

export default DriveOnline