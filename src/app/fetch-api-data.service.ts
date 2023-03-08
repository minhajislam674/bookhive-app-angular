import { Injectable } from '@angular/core';
import { catchError, ObservedValueOf } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import { Token } from '@angular/compiler';

//Declaring the api url that will provide data for the client app

const apiUrl = 'https://reads.up.railway.app/';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService  {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
   * User registration
   * @service POST to the respective endpoint of apiUrl to register a new user
   * @function userRegistration
   * @param {any} userDetails
   * @returns a new user object in json format
   */

  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  };

  /**
   * User login
   * @service POST to the respective endpoint of apiUrl to log in a new user
   * @function userLogin
   * @param {any} userDetails
   * @returns a user object in json format
   */

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  };

  /**
   * Get all books
   * @service GET request to the respective endpoint of apiUrl to get all books
   * @function getAllBooks
   * @returns a object with all the books in json format
   */

   getAllBooks(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'books', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  };

  /**
   * Get books by title
   * @service GET request to the respective endpoint of apiUrl to get a single book
   * @function getSingleBook
   * @param {number} id
   * @returns a single book object in json
   */

  getSingleBook(id:number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}books/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  };


  /**
   * Get author info
   * @service GET request to the respective endpoint of apiUrl to get author info
   * @function getAuthor
   * @param {number} id
   * @returns a single object in json
   */

  getAuthor(id:number): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(`${apiUrl}authors/${id}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get user info
   * @service GET request to the respective endpoint of apiUrl to get user info
   * @function getUserInfo
   * @returns a user object in json format
   */

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http.get(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update user info
   * @service POST request to the respective endpoint of apiUrl to update user info
   * @function updateUserInfo
   * @param {any} updatedInfo
   * @returns updated user object in json format
   */

  updateUserInfo(updatedInfo: any): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.put(`${apiUrl}users/${username}`, updatedInfo, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete user
   * @service DELETE request to the respective endpoint of apiUrl to remove user 
   * @function deleteUser
   * @returns success messgae if user gets deleted
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Add book to reading list
   * @service POST request to the respective endpoint of apiUrl to add book 
   * @function addReadList
   * @param {string} bookId
   * @returns updated user object in json format
   */

  addReadList(bookId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.post(`${apiUrl}users/${username}/books/${bookId}`, bookId, {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
        })
      }).pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Remove book from read list
   * @service DELETE request to the respective endpoint of apiUrl to remove book 
   * @function removeReadList
   * @param {string} bookId
   * @returns updated user object in json format
   */

  removeReadList(bookId:any) : Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}users/${username}/books/${bookId}`, {
      headers: new HttpHeaders ({
        Authorization: "Bearer " + token
      })
    }).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Get user's books from read list
   * @service GET request to the respective endpoint of apiUrl to get book list
   * @function getReadList
   * @returns an object that holds favorite movie ids
   */

  getReadList() : Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');
    return this.http.get(`${apiUrl}users/${username}/favorites`, {
      headers: new HttpHeaders ({
        Authorization: "Bearer " + token
    })
  }).pipe(
    catchError(this.handleError)
    )
  }

  // Non-typed response extraction

  /**
   * Extracts response data from HTTP response
   * @param {any} res
   * @returns response body or empty object
   */

  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

  // Error handling

  /**
   * Error handler
   * @param error
   * @returns error messageng add @angular/material
   */

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  } 
}