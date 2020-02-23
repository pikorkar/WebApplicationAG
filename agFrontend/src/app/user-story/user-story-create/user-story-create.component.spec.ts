import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryCreateComponent } from './user-story-create.component';

describe('UserStoryCreateComponent', () => {
  let component: UserStoryCreateComponent;
  let fixture: ComponentFixture<UserStoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
