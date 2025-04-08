import {Component, NgModule, OnInit} from '@angular/core';
import {Contact} from '../models/contact';
import {ContactService} from '../services/contact.service';
import {CardContactComponent} from '../card-contact/card-contact.component';

interface ApiResponse { // Assurez-vous que cette interface correspond à votre service
  data: Contact[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

@Component({
  selector: 'app-list-contact',
  imports: [CardContactComponent],
  templateUrl: './list-contact.component.html',
  styleUrl: './list-contact.component.css'
})
export class ListContactComponent implements OnInit {

  contacts: Contact[] = [];
  currentPage = 1;
  totalContacts = 0; // Pour stocker le nombre total de contacts
  pageSize = 10; // Nombre de contacts par page (à ajuster selon votre API)

  token = localStorage.getItem('token') || '';


  constructor(private contactService: ContactService) {

  }

  ngOnInit() {
    this.chargerContact();
  }

  chargerContact() {
    this.contactService.getAllContact(this.currentPage, '', this.token)
      .subscribe((response) => {
        this.contacts = response.data;
        this.totalContacts = response.pagination.total; // Récupérez le total
        console.log('Contacts récupérés:', this.contacts); // Vérifiez dans la console
      }, (error) => {
        console.error('Erreur lors de la récupération des contacts:', error);
      });
  }
  goToNextPage() {
    if (this.currentPage * this.pageSize < this.totalContacts) {
      this.currentPage++;
      this.chargerContact();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.chargerContact();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalContacts / this.pageSize);
  }

  isLastPage(): boolean {
    return this.currentPage * this.pageSize >= this.totalContacts;
  }
}
