import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteUserAction } from '../../../store/userState/user.action';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css',
})
export class DeleteUserComponent {
  indexNumber!: number;
  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //RETRIEVING THE USER DATA BASED ON INDEX NUMBER GOT FROM AN URL
    this.activatedRoute.params.subscribe((data) => {
      this.indexNumber = data['id'];
    });
  }

  //METHOD TO EXECUTE WHEN USER CLICKS ON YES BUTTON
  yesBtnClick() {
    this.store.dispatch(deleteUserAction({ index: this.indexNumber }));
    this.router.navigate(['/users']);
    this.snackBar.open('User Deleted successfully!', 'Close', {
      duration: 3000,
    });
  }

  //METHOD TO EXECUTE WHEN USER CLICKS ON NO BUTTON
  noBtnClick() {
    this.router.navigate(['/users']);
  }
}
