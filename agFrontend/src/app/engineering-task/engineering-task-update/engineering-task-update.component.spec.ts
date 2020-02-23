import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringTaskUpdateComponent } from './engineering-task-update.component';

describe('EngineeringTaskUpdateComponent', () => {
  let component: EngineeringTaskUpdateComponent;
  let fixture: ComponentFixture<EngineeringTaskUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineeringTaskUpdateComponent ]
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
