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
import {
  createUserAction,
  updateUserAction,
} from '../../../store/userState/user.action';
import { ActivatedRoute, Router } from '@angular/router';
import { userSelector } from '../../../store/userState/user.selector';
import { map, Observable, switchMap, take } from 'rxjs';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { user, UserState } from '../../../store/userState/user.state';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  myForm!: FormGroup;
  indexNumber!: number;
  users$!: Observable<user[]>;
  constructor(
    private fb: FormBuilder,
    private store: Store<UserState>,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
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
          const usernameExists = users.some(
            (user) => user.username === control.value
          );
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
          const emailExists = users.some(
            (user) => user.email === control.value
          );
          return emailExists ? { uniqueEmail: true } : null;
        })
      );
    };
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.indexNumber = +params.get('id')!;
          // console.log('Index Number from Route Params:', this.indexNumber);
          return this.store.select(userSelector);
        })
      )
      .subscribe((data) => {
        // console.log('Data from Store:', data);
        if (data && data[this.indexNumber]) {
          // console.log('User Data:', data[this.indexNumber]);
          this.myForm.patchValue({
            name: data[this.indexNumber].name,
            username: data[this.indexNumber].username,
            email: data[this.indexNumber].email,
          });
        }
      });
  }

  //METHOD TO EXECUTE WHEN USER CLICKS ON UPDATE BUTTON
  submitForm() {
    if (this.myForm.valid) {
      this.store.dispatch(
        updateUserAction({
          userData: this.myForm.value,
          index: this.indexNumber,
        })
      );
      this.myForm.reset();
      this.router.navigate(['/users']);
      this.dialogRef.close(this.myForm.value);
      this.snackBar.open('User updated successfully!', 'Close', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Form is invalid. Please check inputs', 'Close', {
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
