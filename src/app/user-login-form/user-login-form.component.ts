import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// We'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created
import { FetchDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent {
  @Input() userData = { email: '', password: '' };

  hidePassword = true;

  constructor(
    public fetchApiData: FetchDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Sending the form inputs to the API to log in user
   * @function loginUser
   */
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        // Logic for a successful user login goes here!
        this.dialogRef.close(); //close the modal on success
        localStorage.setItem('user', response.user.id);
        localStorage.setItem('token', response.token);
        this.router.navigate(['home']);
        this.snackBar.open('Logged in successfully!', 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        this.snackBar.open('Incorrect Username or Password', 'Error', {
          duration: 2000,
        });
      }
    );
  }
}
