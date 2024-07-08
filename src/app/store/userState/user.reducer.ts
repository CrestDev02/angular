import { createReducer, on } from "@ngrx/store";
import { intialState } from "./user.state";
import { createUserAction, deleteUserAction, getAllUsersSuccess, updateUserAction, userDetails } from "./user.action";

//REDUCERS FOR DIFFERENT ACTIONS 
export const userDetailsReducer = createReducer(
    intialState, 
    on(createUserAction, (state, action) => {
        return {
            ...state, 
            users: [...state.users, action.userData]
        }
    }), 
    on(updateUserAction, (state, action) => { 
        const {index, userData }= action;
        const updatedUsers = [...state.users];
        updatedUsers[index] = userData;
        return {
            ...state, 
           users: updatedUsers
        }
    }), 
    on(deleteUserAction, (state, action) => {
        const { index }= action;
        const updatedUsers = [...state.users];
        updatedUsers.splice(index, 1); 
        return {
            ...state, 
            users: updatedUsers
        }
    }),
    on(getAllUsersSuccess, (state, actions) => {
        return {
            ...state,
            users: actions.userData
        }
    })
)