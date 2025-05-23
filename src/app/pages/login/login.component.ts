import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgIf } from '@angular/common';

// Définir une interface pour la réponse de l'API
interface AuthResponse {
  user: {
    token: string;
    id: number;
  };
  // ... autres propriétés de la réponse
}

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement !";
      return; // Empêcher la soumission
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (result) => {
        console.log("Connexion réussie", result);

        // Utiliser l'interface AuthResponse pour le typage
        const authResponse = result as AuthResponse;

        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          localStorage.setItem("token", authResponse.user.token);
          localStorage.setItem("user_id", String(authResponse.user.id));
          console.log("Token enregistré ", authResponse.user.token);
          console.log("id enregistré ", authResponse.user.id);
        } else {
          console.error("Le localStorage n'est pas disponible");
        }

        this.errorMessage = "";
        this.router.navigate(['/dashboard']).then(success => {
          if (success) {
            console.log("Redirection vers le tableau de bord");
          } else {
            console.error("Erreur de redirection vers le tableau de bord");
            this.errorMessage = "Erreur de redirection vers le tableau de bord.";
          }
        }).catch(err => {
          console.error("Erreur de redirection", err);
          this.errorMessage = "Erreur de redirection.";
        });
      },
      error: (err) => {
        console.error("Erreur API", err);
        this.errorMessage = err.error.message || "Erreur de connexion";
        this.loginForm.reset();
      }
    });
  }

  toReg() {
    this.router.navigateByUrl('register');
  }
}
