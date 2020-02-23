import { Component, OnInit } from '@angular/core';
import { SprintService } from 'src/app/services/sprint.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Sprint } from 'src/app/models/sprint';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoryCreateComponent } from 'src/app/user-story/user-story-create/user-story-create.component';
import { UserStoryService } from 'src/app/services/user-story.service';
import { UserStory } from 'src/app/models/user-story';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import { EngineeringTaskCreateComponent } from 'src/app/engineering-task/engineering-task-create/engineering-task-create.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  // To get project ID
  private routeSub: Subscription;

  // Loading
  loading: boolean = false;

  // Project
  projectId: number;
  project: Project;

  // Sprints
  sprints: Sprint[] = [];
  activeSprint: Sprint = null;

  // User Stories
  userStories: UserStory[];

  constructor(private sprintService: SprintService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private userStoryService: UserStoryService,
    private projectService: ProjectService,
    private router: Router) { }

  ngOnInit() {
    // start loading
    this.loading = true;

    // Get Project ID from route
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });

    // Get Project - by ID from route
    this.projectService.getById(this.projectId).pipe(first()).subscribe(project => {
      this.project = project;
    }, error => {
      alert(error.message);
    });

    // Get all Sprints in Proejct
    this.sprintService.getAllByProject(this.projectId).pipe(first()).subscribe(sprints => {
      this.sprints = sprints;
      this.findActiveSprint();
    }, error => {
      alert(error.message);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  findActiveSprint() {
    if (this.sprints.length > 0) {
      let projectIsInpast: boolean = true;
      for (let sprint of this.sprints) {
        if (moment().isBetween(moment(sprint.startDate), moment(sprint.endDate), null, '[]')) {
          sprint.active = true;
          projectIsInpast = false;
          this.activeSprint = sprint;
        }
      }
      if (projectIsInpast) {
        this.sprints[0].active = true;
        this.activeSprint = this.sprints[0];
      }
      this.getAllUserStoriesBySprintId(this.activeSprint.id);
    }
  }

  changeSprint(index: number) {
    for (let sprint of this.sprints) {
      sprint.active = false;
    }

    this.sprints[index].active = true;
    this.activeSprint = this.sprints[index];
    this.getAllUserStoriesBySprintId(this.activeSprint.id);
  }

  // Create new User Story - modal window
  createUserStory() {
    const modalRef = this.modalService.open(UserStoryCreateComponent);
    modalRef.componentInstance.sprintId = this.activeSprint.id;
    modalRef.componentInstance["userStoryCreated"].subscribe(event => {
      this.getAllUserStoriesBySprintId(this.activeSprint.id);
    });
  }

  // Return User Stories in selected Sprint
  getAllUserStoriesBySprintId(id: number) {
    this.userStoryService.getAllBySprint(id).pipe(first()).subscribe(userStories => {
      this.userStories = userStories;
      this.loading = false;
    }, error => {
      alert(error.message);
    });
  }

  goToBacklog() {
    this.router.navigate(['backlog'], { relativeTo: this.route });
  }

  createEngineeringTask() {
    const modalRef = this.modalService.open(EngineeringTaskCreateComponent);
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance["engineeringTaskCreated"].subscribe(event => {
      // this.getAllUserStoriesBySprintId(this.activeSprint.id);
    });
  }

  getAllEngineeringTasksByUserStory() {

  }
}
