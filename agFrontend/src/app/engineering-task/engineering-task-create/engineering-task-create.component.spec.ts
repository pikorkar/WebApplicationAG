import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringTaskCreateComponent } from './engineering-task-create.component';

describe('EngineeringTaskCreateComponent', () => {
  let component: EngineeringTaskCreateComponent;
  let fixture: ComponentFixture<EngineeringTaskCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineeringTaskCreateComponent ]
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
