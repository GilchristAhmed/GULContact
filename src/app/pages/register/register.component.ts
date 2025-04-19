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
  selector: 'app-register',
  imports: [
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      photo: ['', [Validators.required, Validators]]

    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement !";
      return; // Empêcher la soumission
    }

    const { email, password, photo } = this.registerForm.value;

    this.authService.register(email, password,photo).subscribe({
      next: (result) => {
        console.log("Connexion réussie", result);

        // Utiliser l'interface AuthResponse pour le typage
        const authResponse = result as AuthResponse;

        this.errorMessage = "";
        this.router.navigate(['/login']).then(success => {
          if (success) {
            console.log("Redirection vers le login");
          } else {
            console.error("Erreur de redirection");
            this.errorMessage = "Erreur de redirection";
          }
        }).catch(err => {
          console.error("Erreur de redirection", err);
          this.errorMessage = "Erreur de redirection.";
        });
      },
      error: (err) => {
        console.error("Erreur API", err);
        this.errorMessage = err.error.message || "Erreur de connexion";
        this.registerForm.reset();
      }
    });
  }

  toLog() {
    this.router.navigateByUrl('login');
  }
}
