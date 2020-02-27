import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoryUpdateComponent } from './user-story-update.component';

describe('UserStoryUpdateComponent', () => {
  let component: UserStoryUpdateComponent;
  let fixture: ComponentFixture<UserStoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserStoryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
