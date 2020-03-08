import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringTaskCreateComponent } from './engineering-task-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EngineeringTaskService } from '../service/engineering-task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('EngineeringTaskCreateComponent', () => {
  let component: EngineeringTaskCreateComponent;
  let fixture: ComponentFixture<EngineeringTaskCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ EngineeringTaskCreateComponent ],
      providers: [ EngineeringTaskService, NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineeringTaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
