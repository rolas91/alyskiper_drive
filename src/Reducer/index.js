import { combineReducers } from 'redux';
import Usuario from './Usuario'
import NewTravels from './NewTravels';
import Position from './Position'
import DriveOnline from './DriveOnline';
import wallets from './wallets';

const rootReducer = combineReducers({
    Usuario: Usuario,
    NewTravels: NewTravels,
    Position: Position,
    DriveOnline: DriveOnline,
    wallets: wallets
});

export default rootReducer;