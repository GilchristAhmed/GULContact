import { Routes } from '@angular/router';
import {ListContactComponent} from './list-contact/list-contact.component';
import {DetailContactComponent} from './detail-contact/detail-contact.component';
import {LoginComponent} from './login/login.component';
import {FormcontactComponent} from './formcontact/formcontact.component';

export const routes: Routes = [
  {path: 'dashboard', component: ListContactComponent},
  {path: 'contact/:id', component: DetailContactComponent},
  {path: '', component: LoginComponent},
  {path: 'Ajout', component: FormcontactComponent}
];
