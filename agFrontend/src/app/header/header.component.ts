import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoryCreateComponent } from '../user-story/user-story-create/user-story-create.component';
import { EngineeringTaskCreateComponent } from '../engineering-task/engineering-task-create/engineering-task-create.component';
import { Location } from '@angular/common';
import { ProjectService } from '../project/service/project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // To get project ID
  private routeSub: Subscription;
  private projectId: number;
  public projectName: string;

  @Input() activeSprintId: number;

  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private location: Location,
    private router: Router,
    private projectService: ProjectService) { }

  ngOnInit() {
    // Get Project ID from route
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });

    this.projectService.getById(this.projectId)
      .subscribe(project => {
        this.projectName = project.name;
      }, error => {
        alert(error.message);
      });

  }

  goToBacklog() {
    this.router.navigate(['backlog'], { relativeTo: this.route });
  }

  // Create new User Story - modal window
  createUserStory() {
    const modalRef = this.modalService.open(UserStoryCreateComponent);
    modalRef.componentInstance.sprintId = this.activeSprintId;
    modalRef.componentInstance["userStoryCreated"].subscribe(event => {
      // TODO emit value -- this.getAllUserStoriesBySprintId(this.activeSprint.id);
    });
  }

  // Open modal window form to create new Engineering Task
  createEngineeringTask() {
    const modalRef = this.modalService.open(EngineeringTaskCreateComponent);
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance["engineeringTaskCreated"].subscribe(event => {
      location.reload(true);
    });
  }

  deleteProject() {
    if (confirm("Are you sure to delete Project")) {
      this.projectService.delete(this.projectId).subscribe(() => {
        this.router.navigate(['/projects']);
      }, error => {
        alert(error);
      });
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
