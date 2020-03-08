import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  beforeEach(() => {
    let projectService: ProjectService;

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProjectService,
      ]
    });

    projectService = TestBed.get(ProjectService);
  });

  it('should be created', () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
});
