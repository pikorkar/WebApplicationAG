import { Component, OnInit } from '@angular/core';
import { Project } from './models/project';
import { ProjectService } from './service/project.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Role } from '../users/model/role';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  loading: boolean = false;
  projects: Project[];
  adminRole: Role = Role.Admin;
  productOwner: Role = Role.ProductOwner;

  constructor(private projectService: ProjectService,
    private modalService: NgbModal,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getAll();
  }

  // Can delete or create Project
  get canActivate(): boolean {
    if (this.authenticationService.currentUserValue.role === Role.Admin ||
      this.authenticationService.currentUserValue.role === Role.ProductOwner)
      return true;
    return false;
  }

  // Get all Projects
  getAll() {
    this.loading = true;
    this.projectService.getAll().pipe(first()).subscribe(projects => {
      this.loading = false;
      this.projects = projects;
    }, error => {
      alert(error);
      this.loading = false;
    });
  }

  // Navigate to project detail
  getDetail(id: number) {
    this.router.navigateByUrl(`projects/${id}`);
  }

  // Create Project - open modal form
  create() {
    const modalRef = this.modalService.open(ProjectCreateComponent);
    modalRef.componentInstance["projectCreated"].subscribe(event => {
      this.getAll();
    });
  }

  // Delete Project
  delete(id: number) {
    if (confirm("Are you sure to delete project")) {
      this.projectService.delete(id).subscribe(() => {
        this.getAll();
      }, error => {
        alert(error);
      });
    }
  }

}
