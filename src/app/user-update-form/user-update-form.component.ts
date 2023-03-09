import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss']
})
export class UserUpdateFormComponent implements OnInit {

  @Input() updatedUser = {username: ''};

  constructor(
    public fetchApiData: FetchDataService,
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {}

  updateUser(): void {
    this.fetchApiData.updateUserInfo(this.updatedUser).subscribe((resp: any) => {
      console.log(resp);
      this.dialogRef.close();
      this.snackBar.open('Your username has been updated!', 'OK', {
        duration: 2000
      });
      window.location.reload();
    });
  }
}
