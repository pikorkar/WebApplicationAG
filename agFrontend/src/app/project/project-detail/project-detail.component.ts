import { Component, OnInit } from '@angular/core';
import { SprintService } from 'src/app/services/sprint.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Sprint } from 'src/app/models/sprint';
import * as moment from 'moment';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  private routeSub: Subscription;
  projectId: number;
  sprints: Sprint[] = [];
  loading: boolean = false;
  activeSprintId: number = 0;

  constructor(private sprintService: SprintService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });

    this.loading = true;
    this.sprintService.getAllByProject(this.projectId).pipe(first()).subscribe(sprints => {
      this.sprints = sprints;
      this.findActiveSprint();
      this.loading = false;
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
          this.activeSprintId = sprint.id;
        }
      }
      if (projectIsInpast) {
        this.sprints[0].active = true;
        this.activeSprintId = this.sprints[0].id;
      }
    }
  }

  changeSprint(index: number) {
    for (let sprint of this.sprints) {
      sprint.active = false;
    }

    this.sprints[index].active = true;
    this.activeSprintId = this.sprints[index].id;
  }
}
