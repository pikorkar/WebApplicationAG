import { TestBed } from '@angular/core/testing';

import { EngineeringTaskService } from './engineering-task.service';

describe('EngineeringTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EngineeringTaskService = TestBed.get(EngineeringTaskService);
    expect(service).toBeTruthy();
  });
});
