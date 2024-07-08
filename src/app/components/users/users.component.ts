import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';
import { user } from '../../store/userState/user.state';
import { userSelector } from '../../store/userState/user.selector';
import { tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterModule,
    UserListComponent,
    CommonModule,
    FormsModule,
    SpinnerComponent,
    MatDialogModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  @Input() searchTerm: string = '';
  isDialogOpen = false;
  users$!: Observable<user[]>;
  filteredUsers: user[] = [];
  toggle: boolean = false;
  createUserRoute: boolean = true;
  updateUserRoute: boolean = false;
  deleteUserRoute: boolean = false;
  spinnerShown: boolean = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.users$ = this.store.select(userSelector).pipe(
      tap((users) => {
        this.spinnerShown = false;
        this.filteredUsers = users;
      })
    );

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.url;
        const urlAfterRedirects = event.urlAfterRedirects;
        if (url === '/users/create') {
          this.createUserRoute = true;
          this.updateUserRoute = false;
          this.deleteUserRoute = false;
        } else {
          this.createUserRoute = true;
          this.updateUserRoute = false;
          this.deleteUserRoute = false;
          this.toggle = false;
        }
      });
  }

  //METHOD TO EXECUTE WHEN USER CLICKS ON CREATE USER BUTTON
  onClick() {
    this.toggle = true;
    this.router.navigate(['users/create']);
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '600px',
      panelClass: 'custom-dialog-container',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  spinnerEvent() {
    const spinnerStatusString = localStorage.getItem('spinnerStatus');
    if (spinnerStatusString) {
      const spinnerStatus = JSON.parse(spinnerStatusString);
      this.spinnerShown = spinnerStatus;
    }
  }

  //SEARCH METHOD
  onSearch() {
    this.users$.subscribe((users) => {
      this.filteredUsers = users.filter(
        (user) =>
          user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
