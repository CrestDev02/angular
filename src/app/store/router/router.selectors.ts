import { createFeatureSelector, createSelector } from "@ngrx/store";

const routerFeatureSelector = createFeatureSelector('router');

export const routerSelector = createSelector(routerFeatureSelector, (state: any) => {
    return state.state;
})