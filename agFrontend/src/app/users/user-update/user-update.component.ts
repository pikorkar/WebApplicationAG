import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UpdateComponent implements OnInit {
  user: User;

  @Input() id;

  constructor(public activeModal: NgbActiveModal,
    private userService: UserService) { }

  ngOnInit() {
    this.getUser(this.id);
  }

  getUser(id: number) {
    this.userService.getById(id).subscribe(
      user => {
        this.user = user;
      },
      error => {
        alert(error.message);
      }
    );
  }

}
