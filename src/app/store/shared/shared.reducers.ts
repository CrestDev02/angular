import { createReducer, on } from "@ngrx/store";
import { initialState } from "./shared.state";
import { spinnerAction } from "./shared.actions";

export const spinnerReducer = createReducer(
    initialState, 
    on(spinnerAction, (state, action) => {
        return {
            ...state, 
            spinnerStatus: action.status,
        }
    })
)