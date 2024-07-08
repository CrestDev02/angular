import { createFeatureSelector, createSelector } from "@ngrx/store";
import { sharedState } from "./shared.state";

const spinnerFeatureSelector = createFeatureSelector<sharedState>('spinner');

export const spinnerSelector = createSelector(spinnerFeatureSelector, (state) => {
    return state.spinnerStatus;
})
