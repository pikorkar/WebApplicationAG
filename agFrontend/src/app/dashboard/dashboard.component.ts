import { Component, OnInit } from '@angular/core';
import { User } from '../users/models/user';
import { UserService } from '../users/services/user.service';
import { first } from 'rxjs/operators';
import { ProjectService } from '../project/services/project.service';
import { Project } from '../project/models/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading: boolean = false;
  users: User[];
  projects: Project[];

  constructor(private userService: UserService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.loading = true;
    // this.userService.getAll().pipe(first()).subscribe(users => {
    //   this.loading = false;
    //   this.users = users;
    // });
    this.projectService.getAll().pipe(first()).subscribe(projects => {
      this.loading = false;
      this.projects = projects;
    });
  }

}
