import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSelector } from '../../../store/userState/user.selector';
import { user } from '../../../store/userState/user.state';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { userDetails } from '../../../store/userState/user.action';
import { spinnerSelector } from '../../../store/shared/shared.selectors';
import { TableModule } from 'primeng/table';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, TableModule, MatIcon],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  @Input() users: user[] = [];
  spinnerShown: boolean = true;
  @Output() spinnerEvent = new EventEmitter();
  constructor(
    private store: Store,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    //HERE ACTION IS CALLED TO RETRIEVE THE USER DETAILS WHEN THE PAGE LOADS
    this.store.dispatch(userDetails());
    setTimeout(() => {
      this.store.select(userSelector).subscribe((data) => {
        this.users = data;
        this.store.select(spinnerSelector).subscribe((status) => {
          this.spinnerShown = status;
          localStorage.setItem(
            'spinnerStatus',
            JSON.stringify(this.spinnerShown)
          );
          this.spinnerEvent.emit();
        });
      });
    }, 1000);
  }

  //METHOD TO EXECUTE WHEN USER CLICKS ON UPDATE BUTTON
  updateBtnClick(index: number) {
    this.router.navigate(['/users/update', index]);
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '600px',
      panelClass: 'custom-dialog-container',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  //METHOD TO EXECUTE WHEN USER CLICKS ON DELETE BUTTON
  deleteBtnClick(index: number) {
    this.router.navigate(['/users/delete', index]);

    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
