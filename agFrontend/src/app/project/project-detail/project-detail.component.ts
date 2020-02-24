import { Component, OnInit } from '@angular/core';
import { SprintService } from 'src/app/services/sprint.service';
import { Subscription, forkJoin } from 'rxjs';
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
import { EngineeringTaskService } from 'src/app/services/engineering-task.service';
import { EngineeringTask } from 'src/app/models/engineering-task';
import { EngineeringTaskUpdateComponent } from 'src/app/engineering-task/engineering-task-update/engineering-task-update.component';
import { Status } from 'src/app/models/status';
import { Location } from '@angular/common';

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
  sprintStart: string;
  sprintEnd: string;

  // User Stories
  userStories: UserStory[];

  engineeringTasks: EngineeringTask[];

  constructor(private sprintService: SprintService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private userStoryService: UserStoryService,
    private projectService: ProjectService,
    private router: Router,
    private engineeringTaskService: EngineeringTaskService,
    private location: Location) { }

  ngOnInit() {
    // start loading
    this.loading = true;

    // Get Project ID from route
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });

    // Get Project - by ID from route
       // Get all Sprints in Proejct
    forkJoin([this.projectService.getById(this.projectId),
    this.sprintService.getAllByProject(this.projectId)
    ]).subscribe(([project, sprints]) => {
      this.project = project;
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
          this.sprintStart = moment(sprint.startDate).format('DD.MM.YYYY');
          this.sprintEnd = moment(sprint.endDate).format('DD.MM.YYYY');
          break;
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
    this.sprintStart = moment(this.sprints[index].startDate).format('DD.MM.YYYY');
    this.sprintEnd = moment(this.sprints[index].endDate).format('DD.MM.YYYY');
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
      this.getEngineeringTaksToUserStories(this.userStories);
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
      location.reload(true);
    });
  }

  openUserStory(userStory: UserStory) {
    userStory.expanded = !userStory.expanded;
  }

  getEngineeringTaksToUserStories(userStories: UserStory[]) {
    for (let userStory of userStories) {
      this.getAllEngineeringTasksByUserStory(userStory);
    }
  }

  getAllEngineeringTasksByUserStory(userStory: UserStory) {
    this.engineeringTaskService.getAllByUserStory(userStory.id).pipe(first()).subscribe(engineeringTasks => {
      userStory.engineeringTasks = engineeringTasks;
      userStory.hoursRemaining = 0;
      userStory.donePercent = 0;
      for (let engineeringTask of userStory.engineeringTasks) {
        userStory.hoursRemaining += engineeringTask.estimatedHours - engineeringTask.doneHours;
        userStory.donePercent += engineeringTask.estimatedHours;
      }
      userStory.donePercent = Math.round(((userStory.donePercent - userStory.hoursRemaining) * 100) / userStory.donePercent);
    }, error => {
      alert(error.message);
    });
  }

  // Open update Enginnering Task form modal window
  updateEngineeringTask(id: number) {
    const modalRef = this.modalService.open(EngineeringTaskUpdateComponent);
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.engineeringTaskId = id;
    modalRef.componentInstance["engineeringTaskUpdated"].subscribe(event => {
      location.reload(true);
    });
  }
}
