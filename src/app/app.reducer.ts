import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
    ui: fromUI.State;
    auth: fromAuth.authState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.userReducer,
    auth: fromAuth.authReducer
}