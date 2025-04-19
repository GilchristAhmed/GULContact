import { Routes } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {DetailContactComponent} from './pages/detail-contact/detail-contact.component';
import {LoginComponent} from './pages/login/login.component';
import {FormcontactComponent} from './pages/formcontact/formcontact.component';
import {authGuard} from './core/guard/auth.guard';
import {RegisterComponent} from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'detail/:id', component: DetailContactComponent,  canActivate: [authGuard]},
  {path: 'detail/:id/formcontact/:id', component: FormcontactComponent ,  canActivate: [authGuard]},
  { path: 'formcontact/:formcontactId', component: FormcontactComponent, canActivate: [authGuard]},
  {path: 'formcontact', component: FormcontactComponent, canActivate: [authGuard]}

];
