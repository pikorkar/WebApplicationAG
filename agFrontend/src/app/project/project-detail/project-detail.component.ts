import { Component, OnInit, OnDestroy } from '@angular/core';
import { SprintService } from 'src/app/services/sprint.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Sprint } from 'src/app/models/sprint';
import * as moment from 'moment';
import { UserStoryService } from 'src/app/user-story/service/user-story.service';
import { UserStory } from 'src/app/user-story/model/user-story';
import { Project } from '../models/project';
import { EngineeringTask } from 'src/app/engineering-task/model/engineering-task';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  // To get project ID
  private routeSub: Subscription;

  // Loading
  loading: boolean = false;

  // Project
  projectId: number;

  // Sprints
  sprints: Sprint[] = [];
  activeSprint: Sprint = null;
  sprintStart: string;
  sprintEnd: string;

  // User Stories
  userStories: UserStory[];

  constructor(private sprintService: SprintService,
    private route: ActivatedRoute,
    private userStoryService: UserStoryService) { }

  ngOnInit() {
    // start loading
    this.loading = true;

    // Get Project ID from route
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });

    // Get all Sprints in Proejct
    this.sprintService.getAllByProject(this.projectId)
      .subscribe(sprints => {
        this.sprints = sprints;
        this.findActiveSprint();
      }, error => {
        alert(error.message);
      });
  }

  findActiveSprint() {
    if (this.sprints.length > 0) {
      let projectIsInpast: boolean = true;
      for (let sprint of this.sprints) {
        if (moment().isBetween(moment(sprint.startDate), moment(sprint.endDate), 'day', '[]')) {
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
        this.sprintStart = moment(this.sprints[0].startDate).format('DD.MM.YYYY');
        this.sprintEnd = moment(this.sprints[0].endDate).format('DD.MM.YYYY');
      }
      this.getAllUserStoriesBySprintId(this.activeSprint.id);
    }
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

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}