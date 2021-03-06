import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email';

interface EmailSummary {
  id: string,
  subject: string,
  from: string
}



@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl: 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummary[]>('https://api.angular-email.com/emails');
  } 

  getEmail(id: string) {
    return this.http.get<Email>('https://api.angular-email.com/emails/'+ id);
  }

  sendEmail(email: Email) {
    return this.http.post('https://api.angular-email.com/emails', email);
  }

}
