import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Role } from '../model/role';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  user: User;

  updateForm: FormGroup;
  loading = false;
  submittedLoading = false;
  submitted = false;
  roles = [
    { value: Role.Admin, label: 'Admin' },
    { value: Role.User, label: 'User' }
  ];

  @Input() id: number;
  @Input() currentUserId: number;

  constructor(public activeModal: NgbActiveModal,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUser(this.id);
  }

  getUser(id: number) {
    this.loading = true;
    this.userService.getById(id).subscribe(
      user => {
        this.user = user;
 
        this.updateForm = this.formBuilder.group({
          firstName: [user.firstName],
          lastName: [user.lastName],
          username: [user.username],
          role: [{value: user.role, disabled: user.id === this.currentUserId}],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        });
        this.loading = false;
      },
      error => {
        alert(error);
        this.loading = false;
      }
    );
  }

  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.validate() || this.updateForm.invalid) {
      return;
    }

    this.submittedLoading = true;
    this.userService.update(this.user.id, this.updateForm.value).pipe(first()).subscribe(
      data => {
        this.activeModal.close();
        alert('User ' + this.user.username + ' has been updated.');
      },
      error => {
        this.submittedLoading = false;
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
