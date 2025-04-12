import { Injectable } from '@angular/core';
import {Contact} from '../../shared/models/contact';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class ContactService {
  //initialisation de l'API
  private apiUrl = 'https://www.api.4gul.kanemia.com/contacts';

  constructor(private http: HttpClient) { }

//Gestion des erreurs
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


  //Recuperer tous les contacts
  getAllContact(token: string) {
   return this.http.get<{ data: Contact[] } >(`${this.apiUrl}`, this.getHeader(token));
  }

//rechercher un contact
  searchContacts(query: string, token: string): Observable<{ data: Contact[] }> {
    return this.http.get<{ data: Contact[] }>(`${this.apiUrl}?search=${query}`, this.getHeader(token));
  }
//Selection un contact en fontion de son ID
  getContactById(id: number,token: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`, this.getHeader(token)).pipe(
      catchError(this.handleError)
    );
  }
  //Ajouter le contact
  addContact(contact: Contact, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, contact, this.getHeader(token)).pipe(
      catchError(this.handleError)
    );
  }

  //mettre à jour le contact
  updateContact(id: number, contact: any, token: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contact,this.getHeader(token));
  }
  //supprimer le contact
  deleteContact(id: number, token: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeader(token) );
  }
  //recuperer les données pour la page suivante
  getData(page: number, token: string): Observable<{ data: Contact[] }> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<{ data: Contact[] }>(url,this.getHeader(token));
  }
}
