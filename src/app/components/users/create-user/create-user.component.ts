import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { createUserAction } from '../../../store/userState/user.action';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable, take } from 'rxjs';
import { user, UserState } from '../../../store/userState/user.state';
import { userSelector } from '../../../store/userState/user.selector';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  myForm!: FormGroup;
  users$: Observable<user[]>;
  constructor(
    private fb: FormBuilder,
    private store: Store<UserState>, // Update the Store type to UserState
    private router: Router,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    private snackBar: MatSnackBar
  ) {
    this.users$ = this.store.pipe(select(userSelector)); // Use the selectUsers selector to get users

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required, this.uniqueUsernameValidator()],
      email: [
        '',
        [Validators.required, Validators.email],
        this.uniqueEmailValidator(),
      ],
    });
  }

  // Custom validator to check unique username
  uniqueUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.users$.pipe(
        take(1),
        map((users) => {
          const usernameExists =
            users && users.some((user) => user.username === control.value);
          return usernameExists ? { uniqueUsername: true } : null;
        })
      );
    };
  }

  // Custom validator to check unique email
  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.users$.pipe(
        take(1),
        map((users) => {
          const emailExists =
            users && users.some((user) => user.email === control.value);
          return emailExists ? { uniqueEmail: true } : null;
        })
      );
    };
  }

  //METHOD TO EXECUTE WHEN USER CLICKS ON CREATE BUTTON
  submitForm() {
    if (this.myForm.valid) {
      this.store.dispatch(createUserAction({ userData: this.myForm.value }));
      this.myForm.reset();
      this.snackBar.open('User Created successfully!', 'Close', {
        duration: 3000,
      });
      this.dialogRef.close(this.myForm.value);
    } else {
      this.snackBar.open('Form is invalid. Please check inputs.', 'Close', {
        duration: 3000,
      });
    }
  }
  //METHOD TO EXECUTE WHEN USER CLICKS ON CANCEL BUTTON
  cancelBtn() {
    this.router.navigate(['/users']);
    this.dialogRef.close();
  }
}
