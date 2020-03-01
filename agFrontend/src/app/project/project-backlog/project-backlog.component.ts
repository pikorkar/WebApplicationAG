import { Component, OnInit, OnDestroy } from '@angular/core';
import { Project } from '../models/project';
import { UserStory } from 'src/app/user-story/model/user-story';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoryService } from 'src/app/user-story/service/user-story.service';
import { ProjectService } from '../service/project.service';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoryCreateComponent } from 'src/app/user-story/user-story-create/user-story-create.component';
import { EngineeringTaskCreateComponent } from 'src/app/engineering-task/engineering-task-create/engineering-task-create.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Role } from 'src/app/users/model/role';
import { AlertService } from 'src/app/alert/service/alert.service';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.scss']
})
export class ProjectBacklogComponent implements OnInit, OnDestroy {
  // Loading
  loading: boolean = false;

  // Project
  private routeSub: Subscription;
  projectId: number;
  project: Project;

  // User Stories
  userStories: UserStory[];

  constructor(private route: ActivatedRoute,
    private userStoryService: UserStoryService,
    private projectService: ProjectService,
    private router: Router,
    private location: Location,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // Start Loading
    this.loading = true;

    // Get Project ID from route
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });

    // Get Project - by ID from route
    this.projectService.getById(this.projectId).pipe(first()).subscribe(project => {
      this.project = project;
      this.getAllUserStories();

    }, error => {
      alert(error);
    });
  }

  // Can delete Project
  get canActivate(): boolean {
    if (this.authenticationService.currentUserValue.role === Role.Admin ||
      this.authenticationService.currentUserValue.role === Role.ProductOwner)
      return true;
    return false;
  }

  // Get all User Stories by Project
  getAllUserStories() {
    this.userStoryService.getAllByProject(this.projectId).pipe(first()).subscribe(userStories => {
      this.userStories = userStories;

      // End Loading
      this.loading = false;
    }, error => {
      alert(error);
    })
  }

  // Create new User Story - modal window
  createUserStory() {
    const modalRef = this.modalService.open(UserStoryCreateComponent);
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance["userStoryCreated"].subscribe(event => {
      this.getAllUserStories();
      this.alertService.success('User Story has been created.');
    });
  }

  // Create new Engineering task - modal window
  createEngineeringTask() {
    const modalRef = this.modalService.open(EngineeringTaskCreateComponent);
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance["engineeringTaskCreated"].subscribe(event => {
      this.getAllUserStories();
      this.alertService.success('Engineering Task has been created.');
    });
  }

  // Delete Project
  deleteProject() {
    if (confirm("Are you sure to delete Project?")) {
      this.projectService.delete(this.projectId).subscribe(() => {
        this.router.navigate(['/projects']);
        this.alertService.success('Project has been deleted.');
      }, error => {
        alert(error);
      });
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
