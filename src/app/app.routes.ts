import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/users/users.component').then(
        (m) => m.UsersComponent
      ),
    children: [
      {
        path: 'create',
        loadComponent: () =>
          import('./components/users/create-user/create-user.component').then(
            (m) => m.CreateUserComponent
          ),
      },
      {
        path: 'update/:id',
        loadComponent: () =>
          import('./components/users/update-user/update-user.component').then(
            (m) => m.UpdateUserComponent
          ),
      },
      {
        path: 'delete/:id',
        loadComponent: () =>
          import('./components/users/delete-user/delete-user.component').then(
            (m) => m.DeleteUserComponent
          ),
      },
    ],
  },
];
