import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.scss']
})
export class EmailReplyComponent implements OnChanges {
  showLoader = false;
  showModal = false;
  @Input() email: Email;

  constructor(private emailService: EmailService) { }

  ngOnChanges(): void {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n------- ${this.email.from} wrote: \n>`
    }
  }

  onSubmit(email: Email) {
    this.showLoader = true;
    this.emailService.sendEmail(email)
      .subscribe(
        () => {
          this.showLoader = false;
          this.showModal = false;
        }, 
        (err) => console.log(err)
      );
  }

}
