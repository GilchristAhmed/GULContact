import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {Contact} from '../../shared/models/contact';
import {ContactService} from '../../core/services/contact.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-detail-contact',
  imports: [RouterModule, NgIf],
  templateUrl: './detail-contact.component.html',
  styleUrl: './detail-contact.component.css'
})
export class DetailContactComponent implements  OnInit {
  contactId!: number;
  contact!: Contact;
  token = localStorage.getItem('token') || '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
) {}

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.contactId);
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContactById(this.contactId, this.token).subscribe({
      next: (res:Contact) => {
        this.contact = res;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du contact', err);
      }
    });
  }

  suppr() {

    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      this.contactService.deleteContact(this.contactId,this.token).subscribe(() => {
        this.router.navigateByUrl('dashboard'); // Recharger la liste des contacts après suppression
      });
    }
  }
}
