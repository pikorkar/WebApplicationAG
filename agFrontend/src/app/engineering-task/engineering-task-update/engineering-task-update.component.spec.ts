import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringTaskUpdateComponent } from './engineering-task-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('EngineeringTaskUpdateComponent', () => {
  let component: EngineeringTaskUpdateComponent;
  let fixture: ComponentFixture<EngineeringTaskUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [EngineeringTaskUpdateComponent],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineeringTaskUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
