import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { mergeMap, map, tap } from 'rxjs/operators'; // Import operators from 'rxjs/operators'
import { UserServices } from '../../components/services/users.services';
import { getAllUsersSuccess, userDetails } from './user.action';
import { Observable } from 'rxjs';
import { spinnerAction } from '../shared/shared.actions';
import { Router } from '@angular/router';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';

@Injectable()
export class UserEffect {
  constructor(
    private actions: Actions,
    private userService: UserServices,
    private store: Store,
    private router: Router
  ) {}

  //EFFECTS FOR SIDE EFFECTS I.E. FOR API CALLING ON USERDETAILS ACTION
  userDetails$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(userDetails),
      mergeMap(() =>
        this.userService.getAllUsers().pipe(
          map((data) => {
            this.store.dispatch(spinnerAction({ status: false }));
            return getAllUsersSuccess({ userData: data });
          })
        )
      )
    )
  );
}
