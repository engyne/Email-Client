import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AsyncValidator, FormControl } from "@angular/forms";
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
    validate = (control: FormControl) => {
        console.log(this.http)
        const { value: username } = control;

        return this.authService.usernameAvailable(username)
            .pipe(
                map(v => null),
                catchError(({ error }) => {
                    if (error.username) {
                        return of({ userNotAvailable: true });
                    } else {
                        return of({ noConnection: true });
                    }
                })
            );

    }
    constructor(private http: HttpClient, private authService: AuthService) {}
}
