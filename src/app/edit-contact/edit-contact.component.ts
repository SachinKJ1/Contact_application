import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ContactSchema } from 'src/models/contactSchema';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  contact: ContactSchema = {};
  groups: any = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private editRouter: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe({
      next: (response: any) => {
        const { id } = response;
        console.log(id);

        this.api.viewContact(id).subscribe({
          next: (res: any) => {
            console.log(res);
            this.contact = res;
          },
        });
      },
    });

    this.api.getGroups().subscribe({
      next: (allGroups: any) => {
        console.log(allGroups);
        this.groups = allGroups;
      },
    });
  }

  editContact(id: any) {
    this.api.editContact(id, this.contact).subscribe({
      next: (res: any) => {
        this.editRouter.navigateByUrl('');
      },
    });
  }
}
