import { createAction, props } from "@ngrx/store";
import { user } from "./user.state";

//LIST OF ACTIONS 
export const userDetails = createAction('[userDetails] getUsers');
export const getAllUsersSuccess = createAction('[userDetails] getAllUsersSuccess', props<{userData: any}>());
export const createUserAction = createAction('[userDetails] createUser', props<{userData: user}>());
export const updateUserAction = createAction('[userDetails] updateUsers', props<{userData: user, index: number}>())
export const deleteUserAction = createAction('[userDetails] deleteUsers', props<{index: number}>());