import { Injectable } from '@angular/core';
import {Contact} from '../models/contact';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


interface ApiResponse {
  data: Contact[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  private apiUrl = 'https://www.api.4gul.kanemia.com/contacts';

  constructor(private http: HttpClient) { }

  private getHeader(token:string){
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
      headers = headers.set('Content-Type', 'application/json');
    return { headers };
  }

  getAllContact(page: number = 1, search: string = '', token: string): Observable<ApiResponse> {
    let params = new HttpParams().set('page', page.toString());
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<any>(`${this.apiUrl}?page=${page}&search=${search}`, this.getHeader(token));
  }




  postContact(contact: Contact): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(this.apiUrl, contact, this.getHeader(<string>token));
  }


}
