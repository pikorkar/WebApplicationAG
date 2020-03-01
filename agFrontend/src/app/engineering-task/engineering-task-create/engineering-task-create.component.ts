import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EngineeringTaskService } from 'src/app/engineering-task/service/engineering-task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { UserStory } from 'src/app/user-story/model/user-story';
import { UserStoryService } from 'src/app/user-story/service/user-story.service';

@Component({
  selector: 'app-engineering-task-create',
  templateUrl: './engineering-task-create.component.html',
  styleUrls: ['./engineering-task-create.component.scss']
})
export class EngineeringTaskCreateComponent implements OnInit {
  createForm: FormGroup;
  loading: boolean = false;
  submittedLoading = false;
  submitted: boolean = false;
  userStories: UserStory[];

  // Input
  @Input() projectId: number;

  // Output
  @Output() engineeringTaskCreated: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private engineeringTaskService: EngineeringTaskService,
    public activeModal: NgbActiveModal,
    private userStoryService: UserStoryService) { }

  ngOnInit() {
    // Start Loading
    this.loading = true;

    // Get all User Stories by Project for userStory select
    this.userStoryService.getAllByProject(this.projectId).pipe(first()).subscribe(userStories => {
      this.userStories = userStories;

      this.createForm = this.formBuilder.group({
        name: ['', Validators.required],
        userStoryId: ['', Validators.required],
        estimatedHours: ['', Validators.required],
        priority: ['', Validators.required],
        description: ['', Validators.required]
      });

      this.loading = false;

    }, error => {
      alert(error);
      this.loading = false;

    })
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    // Start Submitted Loading
    this.submittedLoading = true;
    this.engineeringTaskService.create(this.createForm.value).pipe(first()).subscribe(
      data => {
        this.activeModal.close();
        alert('Engineering task has been created.');
        this.engineeringTaskCreated.emit();
      },
      error => {
        // Stop Submitted Loading
        this.submittedLoading = false;
        alert(error);
      }
    )
  }

}
