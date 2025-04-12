import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {ContactService} from '../../../core/services/contact.service';
import {filter} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
   token = localStorage.getItem('token');
  constructor(private router: Router, private authService: AuthService, private contactService: ContactService) { }

  ngOnInit() {
    // Écouter les événements de navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtrer pour ne garder que les événements de fin de navigation
    ).subscribe(() => {
      this.onRouteChange(); // Appeler la méthode pour gérer le changement de route
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
      window.location.reload(); // Rafraîchir la page
  }

  isAuthenticated():boolean {
    return !!this.token;
  }
  onRouteChange() {
    // Logique pour mettre à jour le header ou effectuer d'autres actions
    console.log('Changement de route détecté');
  }




}
