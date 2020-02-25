import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringTaskComponent } from './engineering-task.component';

describe('EngineeringTaskComponent', () => {
  let component: EngineeringTaskComponent;
  let fixture: ComponentFixture<EngineeringTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineeringTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineeringTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
