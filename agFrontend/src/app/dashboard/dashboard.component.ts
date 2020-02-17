import { Component, OnInit } from '@angular/core';
import { User } from '../users/models/user';
import { UserService } from '../users/services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    // this.userService.getAll().pipe(first()).subscribe(users => {
    //   this.loading = false;
    //   this.users = users;
    // });
  }

}
