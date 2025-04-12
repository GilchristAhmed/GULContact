import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../../shared/models/contact';
import {ContactService} from '../../core/services/contact.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-card-contact',
  imports: [
    RouterLink
  ],
  templateUrl: './card-contact.component.html',
  styleUrl: './card-contact.component.css'
})
export class CardContactComponent implements OnInit{
  @Input() contact!: Contact;


  constructor(private contactService: ContactService) { }

  ngOnInit() {

  }


}
