import { Injectable } from '@angular/core';
import {Contact, ApiResponse} from '../../shared/models/contact';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {forkJoin, map, Observable, of, switchMap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';



@Injectable({
  providedIn: 'root'
})

export class ContactService {
  private apiUrl = 'https://www.api.4gul.kanemia.com/contacts';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Une erreur réseau s\'est produite :', error.error);
    } else {
      console.error(`Erreur du backend : ${error.status}, corps :`, error.error);
    }
    return throwError(() => new Error('Une erreur est survenue, veuillez réessayer.'));
  }


  private getHeader(token:string){
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return { headers };
  }

  getAllContact(token: string) {

   return this.http.get<{ data: Contact[] } >(`${this.apiUrl}`, this.getHeader(token));
  }



  searchContacts(query: string, token: string): Observable<any> {
    const headers = this.getHeader(token);
    const params = new HttpParams().set('page', 1).set('search', query);
    return this.http.get<any>(`${this.apiUrl}?${params}`, this.getHeader(token));
  }

  getContactById(id: number,token: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`, this.getHeader(token)).pipe(
      catchError(this.handleError) // Gérer les erreurs
    );
  }

  addContact(contact: Contact, token: string): Observable<any> {
    // Envoyer la requête POST à l'API
    return this.http.post(`${this.apiUrl}`, contact, this.getHeader(token)).pipe(
      catchError(this.handleError) // Gérer les erreurs
    );
  }


  updateContact(id: number, contact: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contact,this.getHeader(token));
  }

  deleteContact(id: number, token: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeader(token) );
  }

  getData(page: number, token: string): Observable<{ data: Contact[] }> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<{ data: Contact[] }>(url,this.getHeader(token));
  }
}
