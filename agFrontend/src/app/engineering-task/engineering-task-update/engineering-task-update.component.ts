import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStory } from 'src/app/models/user-story';
import { User } from 'src/app/users/models/user';
import { EngineeringTaskService } from 'src/app/services/engineering-task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserStoryService } from 'src/app/services/user-story.service';
import { UserService } from 'src/app/users/services/user.service';
import { first } from 'rxjs/operators';
import { Status } from 'src/app/models/status';
import { EngineeringTask } from 'src/app/models/engineering-task';

@Component({
  selector: 'app-engineering-task-update',
  templateUrl: './engineering-task-update.component.html',
  styleUrls: ['./engineering-task-update.component.scss']
})
export class EngineeringTaskUpdateComponent implements OnInit {
  updateForm: FormGroup;
  loading: boolean = false;
  submittedLoading = false;
  submitted: boolean = false;
  userStories: UserStory[];
  users: User[];

  statuses = [
    { value: Status.New, label: 'New' },
    { value: Status.Active, label: 'Active' },
    { value: Status.Review, label: 'Review' },
    { value: Status.Done, label: 'Done' }
  ];

  @Input() projectId: number;
  @Input() engineeringTaskId: number;
  @Output() engineeringTaskUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private engineeringTaskService: EngineeringTaskService,
    public activeModal: NgbActiveModal,
    private userStoryService: UserStoryService,
    private userService: UserService) { }

  ngOnInit() {
    // Start Loading
    this.loading = true;

    // Get all User Stories by Project for userStory select
    this.userStoryService.getAllByProject(this.projectId).pipe(first()).subscribe(userStories => {
      this.userStories = userStories;

      this.userService.getAll().pipe(first()).subscribe(users => {
        this.users = users;

        this.engineeringTaskService.getById(this.engineeringTaskId).pipe(first()).subscribe(engineeringTask => {

          this.updateForm = this.formBuilder.group({
            name: [engineeringTask.name, Validators.required],
            userId: [engineeringTask.userId, Validators.required],
            userStoryId: [engineeringTask.userStoryId, Validators.required],
            status: [engineeringTask.status, Validators.required],
            estimatedHours: [engineeringTask.estimatedHours, Validators.required],
            priority: [engineeringTask.priority, Validators.required]
          });
          this.loading = false;
        });

      });
    }, error => {
      alert(error.message);
      this.loading = false;

    })
  }

  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }

    this.submittedLoading = true;
    this.engineeringTaskService.update(this.engineeringTaskId, this.updateForm.value).pipe(first()).subscribe(
      data => {
        this.activeModal.close();
        alert('Engineering task has been saved.');
        this.engineeringTaskUpdated.emit();
      },
      error => {
        this.submittedLoading = false;
        alert(error.message);
      }
    )
  }

}
