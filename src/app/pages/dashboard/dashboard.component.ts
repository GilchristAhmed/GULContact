import {Component, NgModule, OnInit} from '@angular/core';
import {ApiResponse, Contact, Pagination} from '../../shared/models/contact';
import {ContactService} from '../../core/services/contact.service';
import {Router} from '@angular/router';
import {CardContactComponent} from '../card-contact/card-contact.component';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  imports: [CardContactComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  contacts: Contact[]= [];

  currentPage: number = 1; // Page actuelle
  totalPages!: number;

  token = localStorage.getItem('token') || '';


  searchForm: FormGroup;



  constructor(private contactService: ContactService,
              private router: Router,
              private fb: FormBuilder) {

    this.searchForm = this.fb.group({
      search: [''] // Initialise la valeur de l'input
    });
  }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getAllContact(this.token).subscribe({
      next: (res) => {
        this.contacts = res.data;// Assurez-vous que votre API renvoie ce total
      },
      error: (err) => {
        console.error('Erreur lors du chargement des contacts', err);
      }
    });
  }

  fetchData() {
    this.contactService.getData(this.currentPage, this.token).subscribe(
      data => {
        console.log('Données récupérées:', data);
        this.contacts = data.data; // Mettez à jour cette ligne pour que les contacts affichés soient ceux de la page actuelle
      },
      error => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }


  previousPage() {
    if (this.currentPage > 1) { // Vérifier si nous ne sommes pas déjà à la première page
      this.currentPage--; // Décremente la page actuelle
      this.fetchData(); // Appel à l'API pour récupérer les données de la page
    }
  }

  nextPage() {

      this.currentPage++; // Incrémente la page actuelle
      this.fetchData(); // Appel à l'API pour récupérer les données de la page
  }

   onSearch(searchTerm: string) {
       searchTerm = this.searchForm.value;
      this.contactService.searchContacts(searchTerm,this.token).subscribe({
        next: (res) => {
          this.contacts = res.data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des contacts', err);
        }
      })
    }


  AddContact() {
    this.router.navigateByUrl('formcontact');
  }
}
