import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ContactSchema } from 'src/models/contactSchema';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BASE_URL = 'https://dataforcontacts.onrender.com';
  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    if (error.error) {
      errorMsg = `Error : ${error.message}`;
    } else {
      errorMsg = `Status : ${error.status} \n Error : ${error.message}`;
    }
    return throwError(() => errorMsg);
  }

  getAllContacts(): any {
    return this.http.get(`${this.BASE_URL}/contacts`);
  }

  // view a contact

  viewContact(id: any) {
    return this.http.get(`${this.BASE_URL}/contacts/${id}`);
  }

  // get Group

  getGroup(id: any) {
    return this.http.get(`${this.BASE_URL}/groups/${id}`);
  }

  // get all Group
  getGroups() {
    return this.http.get(`${this.BASE_URL}/groups`);
  }
  //  post request also needs a body in the request
  // add contacts
  addContact(contact: ContactSchema) {
    return this.http.post(`${this.BASE_URL}/contacts`, contact);
  }

  // delete contact
  deleteContact(id: any) {
    return this.http.delete(`${this.BASE_URL}/contacts/${id}`);
  }

  // /edit a contact
  editContact(id: any, contact: ContactSchema) {
    return this.http.put(`${this.BASE_URL}/contacts/${id}`, contact);
  }
}
