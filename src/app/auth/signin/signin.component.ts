import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  showLoader = false;

  authForm = new FormGroup({
    username: new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', 
    [ Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),])
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.valid) {
        this.showLoader = true;
        this.authService.signin(this.authForm.value).subscribe({
          next: () => {
            this.showLoader = false;
            this.router.navigateByUrl('/inbox');
          },
          error: ({ error }) => {
            if (error.username || error.password) {
              this.authForm.setErrors({ credentials: true });
            }
          }
        });
     }
  }

}
