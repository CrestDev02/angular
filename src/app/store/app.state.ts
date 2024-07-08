import { routerReducer } from '@ngrx/router-store';
import { userDetailsReducer } from './userState/user.reducer';
import { spinnerReducer } from './shared/shared.reducers';

// GLOBAL STORE CONFIG
export const appReducers = {
  userDetails: userDetailsReducer,
  spinner: spinnerReducer,
  router: routerReducer,
};
