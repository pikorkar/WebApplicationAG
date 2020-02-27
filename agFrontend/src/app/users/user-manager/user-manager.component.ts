import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

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
    private authenticationService: AuthenticationService) { }

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

  updateUser(id: number) {
    const modalRef = this.modalService.open(UserUpdateComponent);
    modalRef.componentInstance.id = id;
  }

  deletUser(id: number) {
    if (confirm("Are you sure to delete")) {
      this.userService.delete(id).subscribe(() => {
        this.getAllUsers();
      }, error => {
        alert(error);
      });
    }
  }

}
