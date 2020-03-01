import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/project/service/project.service';
import { first } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/alert/service/alert.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  createForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  // Output
  @Output() projectCreated: EventEmitter<any> = new EventEmitter();
  
  constructor(private formBuilder: FormBuilder,
    private projectService: ProjectService,
    public activeModal: NgbActiveModal,
    private alertService: AlertService) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      sprintLength: ['', Validators.required],
      numberOfSprints: ['', Validators.required],
      startDate: ['', Validators.required]
    });
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    this.loading = true;
    this.projectService.create(this.createForm.value).pipe(first()).subscribe(
      data => {
        this.activeModal.close();
        this.alertService.success('Project has been created.');
        this.projectCreated.emit();
      },
      error => {
        this.loading = false;
        alert(error);
      }
    )
  }
}
