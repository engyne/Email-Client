import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupCredentials {
  username: string,
  password: string,
  passwordConfirmation: string
}

interface SigninCredentials {
  username: string,
  password: string
}

interface SignupResponse {
  username: string
}

interface SignedinResponse {
  authenticated: boolean,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  
   signedIn = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, { username });
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(tap(v => this.signedIn.next(true)))
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(tap(({authenticated}) => this.signedIn.next(authenticated)));
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(tap(() => this.signedIn.next(false)));
  }

  signin(credentails: SigninCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentails)
      .pipe(tap(() => this.signedIn.next(true)));
  }

}
