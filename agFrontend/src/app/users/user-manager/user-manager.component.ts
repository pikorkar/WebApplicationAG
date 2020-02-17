import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  loading: boolean = false;
  users: User[];

  constructor(private userService: UserService,
    private modalService: NgbModal) { }

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
        alert(error.message);
      });
  }

  updateUser(id: number) {
    const modalRef = this.modalService.open(UpdateComponent);
    modalRef.componentInstance.id = id;
  }

  deletUser(id: number) {
    if (confirm("Are you sure to delete")) {
      this.userService.delete(id).subscribe(() => {
        this.getAllUsers();
      }, error => {
        alert(error.message);
      });
    }
  }
 
}
