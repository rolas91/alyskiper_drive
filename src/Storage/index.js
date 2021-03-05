import { createStore } from 'redux';
import rootReducer from '../Reducer/index';

let store = createStore(rootReducer)

export { store }