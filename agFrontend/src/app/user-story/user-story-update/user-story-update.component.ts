import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint.service';
import { first } from 'rxjs/operators';
import { UserStoryService } from '../service/user-story.service';
import { forkJoin } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-story-update',
  templateUrl: './user-story-update.component.html',
  styleUrls: ['./user-story-update.component.scss']
})
export class UserStoryUpdateComponent implements OnInit {
  updateForm: FormGroup;
  submittedLoading = false;
  loading: boolean = false;
  submitted: boolean = false;
  sprints: Sprint[];

  @Input() projectId: number;
  @Input() userStoryId: number;
  @Output() userStoryUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private userStoryService: UserStoryService,
    private sprintService: SprintService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // Start Loading
    this.loading = true;

    forkJoin([this.sprintService.getAllByProject(this.projectId),
      this.userStoryService.getById(this.userStoryId)
      ]).subscribe(([sprints, userStory]) => {
        this.sprints = sprints;
        
        this.updateForm = this.formBuilder.group({
          name: [userStory.name, Validators.required],
          sprintId: [userStory.sprintId, Validators.required],
        });
  
        // End loading
        this.loading = false;
      }, error => {
        alert(error);
        this.loading = false;
      });
    }

    get f() { return this.updateForm.controls; }

    onSubmit() {
      this.submitted = true;
  
      if (this.updateForm.invalid) {
        return;
      }
  
      this.submittedLoading = true;
      this.userStoryService.update(this.userStoryId, this.updateForm.value).pipe(first()).subscribe(
        data => {
          this.activeModal.close();
          alert('User Story has been saved.');
          this.userStoryUpdated.emit(); // TODO
        },
        error => {
          this.submittedLoading = false;
          alert(error);
        }
      )
    }
}
