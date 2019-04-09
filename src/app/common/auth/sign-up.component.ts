import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  signUp(): void {
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    if (
      newUser.firstName &&
      newUser.lastName &&
      newUser.email &&
      newUser.password
    ) {
      this.authService.signup(newUser.firstName, newUser.lastName,
        newUser.email, newUser.password).subscribe((response) => {
          this.router.navigateByUrl('/login');
        });
    } else {
      console.log('broken form, not valid YO');
    }
  }
}
