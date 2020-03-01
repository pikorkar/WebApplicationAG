import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserStory } from './model/user-story';
import { first } from 'rxjs/operators';
import { EngineeringTaskService } from '../engineering-task/service/engineering-task.service';
import { UserStoryService } from './service/user-story.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoryUpdateComponent } from './user-story-update/user-story-update.component';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.scss']
})
export class UserStoryComponent implements OnInit {
  public isExpanded: boolean = false;

  // Input
  @Input() userStory: UserStory;
  @Input() projectId: number = null;

   // Output
   @Output() userStoryUD: EventEmitter<any> = new EventEmitter();

  constructor(private engineeringTaskService: EngineeringTaskService,
    private userStoryService: UserStoryService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getEngineeringTasks(this.userStory);
  }

  expand() {
    this.isExpanded = !this.isExpanded;
  }

  getEngineeringTasks(userStory: UserStory) {
    this.engineeringTaskService.getAllByUserStory(userStory.id).pipe(first()).subscribe(engineeringTasks => {
      userStory.engineeringTasks = engineeringTasks;
      userStory.hoursRemaining = 0;
      userStory.donePercent = 0;
      for (let engineeringTask of userStory.engineeringTasks) {
        userStory.hoursRemaining += engineeringTask.estimatedHours - engineeringTask.doneHours;
        userStory.donePercent += engineeringTask.estimatedHours;
      }
      userStory.donePercent = Math.round(((userStory.donePercent - userStory.hoursRemaining) * 100) / userStory.donePercent);
      if (Number.isNaN(userStory.donePercent)) userStory.donePercent = 0;
    }, error => {
      alert(error);
    });
  }

  // Update User Story
  update(id: number) {
    const modalRef = this.modalService.open(UserStoryUpdateComponent);
    modalRef.componentInstance.userStoryId = id;
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance["userStoryUpdated"].subscribe(event => {
      this.userStoryUD.emit();
    });
  }

  // Delete User Story
  delete(id: number) {
    if (confirm("Are you sure to delete Usser Story")) {
      this.userStoryService.delete(id).subscribe(() => {
        this.userStoryUD.emit();
      }, error => {
        alert(error);
      });
    }
  }

}
