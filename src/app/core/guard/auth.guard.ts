import { CanActivateFn } from '@angular/router';

 // Assurez-vous que le chemin est correct
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Accès autorisé
  } else {
    router.navigate(['/login']); // Redirection vers la page de connexion
    return false;
  }
};
