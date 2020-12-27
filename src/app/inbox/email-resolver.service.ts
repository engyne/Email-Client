import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Email } from './email';
import { EmailService } from './email.service';


@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(
    private emailService: EmailService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const { id } = route.params;
    return this.emailService.getEmail(id);
  }
  
}
