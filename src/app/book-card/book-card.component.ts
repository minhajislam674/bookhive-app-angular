import { Component, OnInit } from '@angular/core';
import { FetchDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthorPageComponent } from '../author-page/author-page.component';
import { DescriptionPageComponent } from '../description-page/description-page.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  books: any[] = [];
  

  constructor(
    public fetchApiData: FetchDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

    ) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.fetchApiData.getAllBooks().subscribe((resp: any) => {
      this.books = resp;
      console.log(this.books);
      return (this.books);
    });
  }


  addToReadList(id: any): void {
    this.fetchApiData.addReadList(id).subscribe((resp: any) => {
      console.log(resp);
    });
    this.snackBar.open('Added to your bookshelf!', 'OK', {
      duration: 2000
    });  
  }



  openAuthorDialog(name: string, bio: string, image: any): void {
    this.dialog.open(AuthorPageComponent, {
      data: 
        {
          Name: name,
          Bio: bio,
          Image: image
        },
      width: '580px',
      height: '350px',
    });
  }

  openDescriptionDialog(title: string, summary: string, pages: number, year: number): void {
    this.dialog.open(DescriptionPageComponent, {
      data: 
        {
          Title: title,
          Description: summary,
          Year: year,
          Pages: pages,
        }, 
      width: '580px',
      height: '400px', 
    });
  }


}
