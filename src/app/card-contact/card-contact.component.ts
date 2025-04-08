import {Component, Input, OnInit} from '@angular/core';
import {Contact} from '../models/contact';

@Component({
  selector: 'app-card-contact',
  imports: [],
  templateUrl: './card-contact.component.html',
  styleUrl: './card-contact.component.css'
})
export class CardContactComponent implements OnInit{
  @Input() contact!: Contact;

  ngOnInit() {

  }


}
