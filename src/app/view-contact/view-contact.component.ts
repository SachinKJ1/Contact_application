import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css'],
})
export class ViewContactComponent {
  contact: any = {};
  errorMsg: string = '';
  group: any;
  constructor(private api: ApiService, private viewRouter: ActivatedRoute) {}

  ngOnInit() {
    this.viewRouter.params.subscribe((data: any) => {
      const { id } = data;

      this.api.viewContact(id).subscribe({
        next: (respnse: any) => {
          const { groupId } = respnse;
          this.api.getGroup(groupId).subscribe({
            next: (res: any) => {
              this.group = res.name;
              
            },
          });
          this.contact = respnse;
        },
        error: (err: any) => {
          console.log(err.message);
          this.errorMsg = err.message;
        },
      });
    });
  }
}
