import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

// SELECTORS TO RETRIEVED THE DATA FROM THE STORE
const userFeatureSelector = createFeatureSelector<UserState>('userDetails');

export const userSelector = createSelector(
  userFeatureSelector,
  (state: UserState) => {
    return state.users;
  }
);
