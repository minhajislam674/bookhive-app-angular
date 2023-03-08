import { Component, OnInit, Input  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { username: '', email: '', password: '' };

  constructor(
    public fetchApiData: FetchDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

ngOnInit(): void {
  }

// This is the function responsible for sending the form inputs to the backend
registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
// Logic for a successful user registration goes here! (To be implemented)
   this.dialogRef.close(); // This will close the modal on success!
   this.snackBar.open('User registered successfully! Please log in to continue.', 'OK', {
      duration: 2000
   });
  });
}

}