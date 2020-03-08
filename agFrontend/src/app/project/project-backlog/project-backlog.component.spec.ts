import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBacklogComponent } from './project-backlog.component';
import { UserStoryComponent } from 'src/app/user-story/user-story.component';
import { EngineeringTaskComponent } from 'src/app/engineering-task/engineering-task.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectBacklogComponent', () => {
  let component: ProjectBacklogComponent;
  let fixture: ComponentFixture<ProjectBacklogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ ProjectBacklogComponent, UserStoryComponent, EngineeringTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
