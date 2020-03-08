import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoryCreateComponent } from '../user-story/user-story-create/user-story-create.component';
import { EngineeringTaskCreateComponent } from '../engineering-task/engineering-task-create/engineering-task-create.component';
import { Location } from '@angular/common';
import { ProjectService } from '../project/service/project.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Role } from '../users/model/role';
import { AlertService } from '../alert/service/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // To get project ID
  private routeSub: Subscription;

  // Project
  private projectId: number;
  public projectName: string;

  // Input
  @Input() activeSprintId: number;

  // Output
  @Output() engTaskUsStoryCreated: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute,
    private modalService: NgbModal,
    private location: Location,
    private router: Router,
    private projectService: ProjectService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // Get Project ID from route
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });

    // Get Project data
    this.projectService.getById(this.projectId)
      .subscribe(project => {
        this.projectName = project.name;
      }, error => {
        alert(error);
      });
  }

  // Open Project backlog
  goToBacklog() {
    this.router.navigate(['backlog'], { relativeTo: this.route });
  }

  // Can delete Project
  get canActivate(): boolean {
    if (this.authenticationService.currentUserValue && (this.authenticationService.currentUserValue.role === Role.Admin ||
      this.authenticationService.currentUserValue.role === Role.ProductOwner))
      return true;
    return false;
  }

  // Create new User Story - modal window
  createUserStory() {
    const modalRef = this.modalService.open(UserStoryCreateComponent);
    modalRef.componentInstance.sprintId = this.activeSprintId;
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance["userStoryCreated"].subscribe(event => {
      this.engTaskUsStoryCreated.emit();
      this.alertService.success('User Story has been created.');
    });
  }

  // Create new Engineering task - modal window
  createEngineeringTask() {
    const modalRef = this.modalService.open(EngineeringTaskCreateComponent);
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance["engineeringTaskCreated"].subscribe(event => {
      this.engTaskUsStoryCreated.emit();
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
