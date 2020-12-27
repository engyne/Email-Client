import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  showLoader = false;

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [this.usernameCheck.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  }, 
    { validators: [this.matchPassword.validate] } 
  );

  constructor(private matchPassword: MatchPassword, 
              private usernameCheck: UniqueUsername,
              private authService: AuthService,
              private router: Router
              ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if ( this.authForm.valid) {
      this.showLoader = true;
      this.authService.signup(this.authForm.value)
        .pipe(finalize(() => this.showLoader = false))
        .subscribe(
          () => this.router.navigateByUrl('/inbox'),
          (error) => this.authForm.setErrors({ unknownError: true })
        );
    }
  }

}
