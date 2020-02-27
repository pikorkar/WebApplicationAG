import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EngineeringTask } from './model/engineering-task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EngineeringTaskUpdateComponent } from './engineering-task-update/engineering-task-update.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EngineeringTaskService } from './service/engineering-task.service';

@Component({
  selector: 'app-engineering-task',
  templateUrl: './engineering-task.component.html',
  styleUrls: ['./engineering-task.component.scss']
})
export class EngineeringTaskComponent implements OnInit, OnDestroy {
  // To get project ID
  private routeSub: Subscription;
  private projectId: number;

  @Input() engineeringTask: EngineeringTask;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private engineeringTaskService: EngineeringTaskService) { }

  ngOnInit() {
    // Get Project ID from route
    this.routeSub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
  }

  // Open update Enginnering Task form modal window
  update() {
    const modalRef = this.modalService.open(EngineeringTaskUpdateComponent);
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.engineeringTaskId = this.engineeringTask.id;
    modalRef.componentInstance["engineeringTaskUpdated"].subscribe(event => {
      location.reload(true);
    });
  }

  // TODO
  delete(id: number) {
    if (confirm("Are you sure to delete Engineering Task")) {
      this.engineeringTaskService.delete(id).subscribe(() => {

      }, error => {
        alert(error);
      });
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
