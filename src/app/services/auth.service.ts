import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface AuthResponse {
  user: {
    token: string;
  };
  // ... autres propriétés de la réponse
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://www.api.4gul.kanemia.com/auth";

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }) // Utiliser email et password
      .pipe(
        tap((response: AuthResponse) => { // Utiliser l'interface AuthResponse
          console.log("Réponse API: ", response);
          if (response.user.token) {
            localStorage.setItem("token", response.user.token);
            console.log("Token enregistré", response.user.token);
          }
        }),
        catchError(this.handleError) // Gestion des erreurs
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Erreur de connexion", error);
    return throwError(() => error);
  }
}
