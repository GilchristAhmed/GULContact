import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../../shared/models/contact';
import {ContactService} from '../../core/services/contact.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-formcontact',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './formcontact.component.html',
  styleUrl: './formcontact.component.css'
})
export class FormcontactComponent implements OnInit {

  contact!: Contact;

  contactId: number | null = null;
  isEditMode = false;

  //recuperer le token
  token = localStorage.getItem('token') || '';
  //recuperer le userID
  user_id : number = Number(localStorage.getItem('id'));

  contactForm: FormGroup;

  constructor(private http: HttpClient, private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private contactService: ContactService) {
    this.contactForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      photo: [''],
    });

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.contactId = +id;
        this.contactService.getContactById(this.contactId,this.token).subscribe(contact => {
          this.contactForm.patchValue(contact);
        });
      }
    });
  }
  //methode pour le bouton submit
  onSubmit(): void {
    //integration de l'ID utilisateur au formulaire de contact
    if (this.contactForm.invalid) return;

    const contactData = {
      ...this.contactForm.value,
      user_id: this.user_id
    };

    if (this.isEditMode && this.contactId) {
      //pour la modification d'un contact
      this.contactService.updateContact(this.contactId, contactData,this.token).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      //Pour l'ajout d'un nouveau contact
      this.contactService.addContact(contactData,this.token).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

}
