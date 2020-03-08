import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserStoryService } from './user-story.service';

describe('UserStoryService', () => {
  beforeEach(() => {
    let userStoryService: UserStoryService;

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserStoryService,
      ]
    });

    userStoryService = TestBed.get(UserStoryService);
  });

  it('should be created', () => {
    const service: UserStoryService = TestBed.get(UserStoryService);
    expect(service).toBeTruthy();
  });
});
