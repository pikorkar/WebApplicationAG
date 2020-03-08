import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SprintService } from './sprint.service';


describe('SprintService', () => {
  beforeEach(() => {
    let sprintService: SprintService;

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SprintService,
      ]
    });

    sprintService = TestBed.get(SprintService);
  });

  it('should be created', () => {
    const service: SprintService = TestBed.get(SprintService);
    expect(service).toBeTruthy();
  });
});
