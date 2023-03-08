import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  routeToBooksView() : void {
    this.router.navigate(['home']);
  }

  routeToMyBooksView() : void { 
    this.router.navigate(['my-books']);
  }

  logout() : void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['welcome']);
    this.snackBar.open('You have been logged out.', 'OK', {
      duration: 3000
    });
  }

}
