import { Component, OnInit } from '@angular/core';
import { Project } from './models/project';
import { ProjectService } from './service/project.service';
import { first } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  loading: boolean = false;
  projects: Project[];

  constructor(private projectService: ProjectService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.projectService.getAll().pipe(first()).subscribe(projects => {
      this.loading = false;
      this.projects = projects;
    });
  }

  create() {
    const modalRef = this.modalService.open(ProjectCreateComponent);
    modalRef.componentInstance["projectCreated"].subscribe(event => {
      this.getAll();
     });
  }

  getDetail(id: number) {
    this.router.navigateByUrl(`projects/${id}`);
  }

}
