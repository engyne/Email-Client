import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSignedIn: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isSignedIn = this.authService.signedIn;
    this.authService.checkAuth().subscribe();  
  }

}
