import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css'],
})
export class AllContactsComponent implements OnInit {
  isLoading = true;
  allContacts: any = [];
  errorMsg = '';
  searchKey = ''
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getContacts();
  }
  getContacts() {
    this.api.getAllContacts().subscribe({
      next: (result: any) => {
        // for seeing the spinner a delay is given
        setTimeout(() => {
          this.allContacts = result;
          this.isLoading = false;
        }, 500);
      },
      error: (err: any) => {
        console.log(err);

        this.isLoading = false;
        this.errorMsg = err.message;
      },
    });
  }
  deleteContact(id: any) {
    this.api.deleteContact(id).subscribe({
      next: (response: any) => {
        this.getContacts();
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
  }
}
