import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AlertService } from 'src/app/alert/service/alert.service';
import { UserRegisterComponent } from '../user-register/user-register.component';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  loading: boolean = false;
  users: User[];

  constructor(private userService: UserService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    },
    error => {
        alert(error);
    });
  }

   // Create User - open modal form
   create() {
    const modalRef = this.modalService.open(UserRegisterComponent);
    modalRef.componentInstance["userCreated"].subscribe(event => {
      this.getAllUsers();
      this.alertService.success('User has been created.');
    });
  }

  updateUser(id: number) {
    const modalRef = this.modalService.open(UserUpdateComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.currentUserId = this.authenticationService.currentUserValue.id;
    modalRef.componentInstance["userUpdated"].subscribe(event => {
      this.getAllUsers();
      this.alertService.success('User has been updated.');
    });
  }

  deletUser(id: number) {
    if (confirm("Are you sure to delete user?")) {
      this.userService.delete(id).subscribe(() => {
        this.getAllUsers();
        this.alertService.success('User has been deleted.');
      }, error => {
        alert(error);
      });
    }
  }

}
