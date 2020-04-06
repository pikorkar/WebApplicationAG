import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
import { Role } from '../model/role';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  roles = [
    { value: Role.Admin, label: 'Admin' },
    { value: Role.ProductOwner, label: 'Product Owner' },
    { value: Role.ScrumMaster, label: 'Scrum Master' },
    { value: Role.User, label: 'User' }
  ];

  // Output
  @Output() userCreated: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public activeModal: NgbActiveModal, ) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.validate() || this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value).pipe(first()).subscribe(
      data => {
        this.activeModal.close();
        this.userCreated.emit();
      },
      error => {
        this.loading = false;
        alert(error);
      }
    )
  }

  validate(): boolean {
    var isInvalid: boolean = false;

    if (this.f['confirmPassword'].value !== this.f['password'].value) {
      this.f['confirmPassword'].setErrors({ 'isMatching': true });
      isInvalid = true;
    } else {
      this.removeError(this.f['confirmPassword'], 'isMatching');
    }

    return isInvalid;
  }

  removeError(control: AbstractControl, error: string) {
    const err = control.errors;
    if (err) {
      delete err[error];
      if (!Object.keys(err).length) {
        control.setErrors(null);
      } else {
        control.setErrors(err);
      }
    }
  }
}
