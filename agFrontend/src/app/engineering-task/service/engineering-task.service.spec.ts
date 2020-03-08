import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EngineeringTaskService } from './engineering-task.service';

describe('EngineeringTaskService', () => {
  beforeEach(() => {
    let engineeringTaskService: EngineeringTaskService;

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        EngineeringTaskService,
      ]
    });

    engineeringTaskService = TestBed.get(EngineeringTaskService);
  });

  it('should be created', () => {
    const service: EngineeringTaskService = TestBed.get(EngineeringTaskService);
    expect(service).toBeTruthy();
  });
});
