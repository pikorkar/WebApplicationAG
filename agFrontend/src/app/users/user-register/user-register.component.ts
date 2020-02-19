import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { Role } from '../models/role';

@Component({
  selector: 'app-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [
    { value: Role.Admin, label: 'Admin' },
    { value: Role.User, label: 'User' }
  ];
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required, UserRegisterComponent.matchValues('password')]],
      role: ['', Validators.required]
    });
  }

  public static matchValues(matchTo: string): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : {
          isMatching: {
            valid: false
          }
        };
      // return {
      //   isMatching: {
      //     valid: false
      //   }
      // };
    };
  }

  validateUsername(): ValidationErrors {
      return (false) ? null : {
        validateUsername: {
          valid: false
        }
      };
  }

  passwordsMatch2(): ValidatorFn {
    return (control: FormGroup): { [key: string]: boolean } | null => {

      console.log("debil");
      if (!control) { return null; }
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      if (!password.value || !confirmPassword.value) {
        return null;
      }
      if (password.value !== confirmPassword.value) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value).pipe(first()).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        this.loading = false;
      }
    )
  }
}
