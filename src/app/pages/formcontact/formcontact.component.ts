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


  token = localStorage.getItem('token') || '';

  user_id : number = Number(localStorage.getItem('id'));

  contactForm: FormGroup;

  constructor(private http: HttpClient, private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private contactService: ContactService) {
    this.contactForm = this.fb.group({
      //user_id: [this.user_id]// Valeur par défaut
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      photo: [''], // Vous pouvez ajouter une validation pour l'URL si nécessaire
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

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id;

    const contactData = {
      ...this.contactForm.value,
      user_id: userId
    };

    if (this.isEditMode && this.contactId) {
      this.contactService.updateContact(this.contactId, contactData,this.token).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.contactService.addContact(contactData,this.token).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
  
}
