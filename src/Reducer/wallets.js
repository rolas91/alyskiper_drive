import { LLENARWALLETS, CLEARWALLETS } from "./ActionTypes"

const initialState = null

const wallets = (state = initialState, action) => {
    switch (action.type) {
        case LLENARWALLETS: {
            return {
                ...action.payload
            }
        }
        case CLEARWALLETS: {
            return initialState
        }
        default: {
            return state;
        }
    }
}

export default wallets