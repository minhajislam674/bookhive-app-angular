import { Component } from '@angular/core';
import { FetchDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

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






}
