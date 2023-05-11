import { Component } from '@angular/core';
import { ContactSchema } from 'src/models/contactSchema';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.css'],
})
export class AddContactsComponent {
  contact: ContactSchema = {};
  groups: any = [];
  constructor(private api: ApiService, private route: Router) {
    this.contact.groupId = 'Select a Group';
  }

  ngOnInit() {
    this.api.getGroups().subscribe({
      next: (response) => {
        console.log(response);
        this.groups = response;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  addContact(contact: ContactSchema) {
    this.api.addContact(contact).subscribe({
      next: (response) => {
        console.log(response);
        this.route.navigateByUrl('');
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
}
