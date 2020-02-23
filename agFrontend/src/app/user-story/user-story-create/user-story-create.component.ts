import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserStoryService } from 'src/app/services/user-story.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-story-create',
  templateUrl: './user-story-create.component.html',
  styleUrls: ['./user-story-create.component.scss']
})
export class UserStoryCreateComponent implements OnInit {
  createForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  @Input() sprintId: number;
  @Output() userStoryCreated: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private userStoryService: UserStoryService,
    public activeModal: NgbActiveModal) { }

    ngOnInit() {
      this.createForm = this.formBuilder.group({
        name: ['', Validators.required]
      });
    }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    this.loading = true;
    this.userStoryService.create(this.createForm.value, this.sprintId).pipe(first()).subscribe(
      data => {
        this.activeModal.close();
        alert('User story has been created.');
        this.userStoryCreated.emit();
      },
      error => {
        this.loading = false;
        alert(error.message);
      }
    )
  }

}
