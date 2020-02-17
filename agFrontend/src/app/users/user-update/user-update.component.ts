import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Role } from '../models/role';
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
          role: [user.role]
        });
        this.loading = false;
      },
      error => {
        alert(error.message);
        this.loading = false;
      }
    );
  }

  public static matchValues(matchTo: string): ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      // return !!control.parent &&
      //   !!control.parent.value &&
      //   control.value === control.parent.controls[matchTo].value
      //   ? null
      //   : { isMatching: false };
      return {
        isMatching: {
          valid: false
        }
      };
    };
  }

  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.updateForm.invalid) {
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
        alert(error.message);
      }
    )
  }


}
