import { Component } from '@angular/core';
import { FetchDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent {
  user: any = {};

  constructor(
    public fetchApiData: FetchDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) {}


ngOnInit(): void {
  this.getUserInfo();

}


getUserInfo(): void {
  this.fetchApiData.getUserInfo().subscribe((resp: any) => {
    this.user = resp;
    console.log(this.user);
    return (this.user);
  });
}

removeFromReadList(id: any): void {
  this.fetchApiData.removeReadList(id).subscribe((resp: any) => {
    console.log(resp);
    this.getUserInfo(); // Re-fetch user data
  });
  this.snackBar.open('Removed from your bookshelf!', 'OK', {
    duration: 2000
  });
}


deleteProfile(): void {
  if (confirm('Are you sure you want to delete your account? This action cannnot be undone.')) {
    this.router.navigate(['welcome']).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.snackBar.open('Your account has been deleted.', 'OK', {
        duration: 3000
      });
    });
  }
  this.fetchApiData.deleteUser().subscribe(res=>{
    console.log('deleteAccountRes:', res);
  })
}

openUpdateUserDialog(): void {
  this.dialog.open(UserUpdateFormComponent, {
    width: '500px',
  });
}

}
