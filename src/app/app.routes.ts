import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {DetailContactComponent} from './pages/detail-contact/detail-contact.component';
import {LoginComponent} from './pages/login/login.component';
import {FormcontactComponent} from './pages/formcontact/formcontact.component';
import {authGuard} from './core/guard/auth.guard';

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'detail/:id', component: DetailContactComponent,  canActivate: [authGuard]},
  {path: 'detail/:id/formcontact/:id', component: FormcontactComponent ,  canActivate: [authGuard]},
  { path: 'formcontact/:formcontactId', component: FormcontactComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'formcontact', component: FormcontactComponent, canActivate: [authGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
