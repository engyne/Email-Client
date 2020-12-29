import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.scss']
})
export class EmailCreateComponent implements OnInit {

  showModal = false;
  email: Email;

  constructor(private authService: AuthService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${this.authService.userName}@angular-email.com`
    }
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email)
      .subscribe({
        next: () => this.showModal = false,
        error: (error) => console.log(error)
      });
  }

}
