import * as fromAuth from './auth.actions';
import { User } from './user.model';

export interface authState {
    user: User;
}

const initState: authState = {
    user: null
};

export function authReducer ( state = initState, action: fromAuth.acciones ): authState {

    switch (action.type) {
        case fromAuth.SET_USER:
            return {
                user: { ...action.user }
            }
    
        default:
            return state;
    }

}