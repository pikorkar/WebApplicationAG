import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineeringTaskComponent } from './engineering-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EngineeringTaskComponent', () => {
  let component: EngineeringTaskComponent;
  let fixture: ComponentFixture<EngineeringTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [EngineeringTaskComponent]
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
