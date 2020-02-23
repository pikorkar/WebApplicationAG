import { Component, OnInit } from '@angular/core';
import { SprintService } from 'src/app/services/sprint.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Sprint } from 'src/app/models/sprint';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoryCreateComponent } from 'src/app/user-story/user-story-create/user-story-create.component';
import { UserStoryService } from 'src/app/services/user-story.service';
import { UserStory } from 'src/app/models/user-story';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  // To get project ID
  private routeSub: Subscription;
  projectId: number;
  loading: boolean = false;

  // Sprints
  sprints: Sprint[] = [];
  activeSprint: Sprint = null;

  // User Stories
  userStories: UserStory[];

  constructor(private sprintService: SprintService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private userStoryService: UserStoryService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });

    this.loading = true;
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

  // Create new User Story modal window
  createUserStory() {
    const modalRef = this.modalService.open(UserStoryCreateComponent);
    modalRef.componentInstance.sprintId = this.activeSprint.id;
    modalRef.componentInstance["userStoryCreated"].subscribe(event => {
      this.getAllUserStoriesBySprintId(this.activeSprint.id);
    });
  }

  getAllUserStoriesBySprintId(id: number) {
    this.userStoryService.getAllBySprint(id).pipe(first()).subscribe(userStories => {
      this.userStories = userStories;
      this.loading = false;
    }, error => {
      alert(error.message);
    });;
  }
}
