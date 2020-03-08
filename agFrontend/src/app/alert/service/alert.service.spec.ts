import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { RouterTestingModule } from '@angular/router/testing';3
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlertService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  });

  it('should be created', () => {
    const service: AlertService = TestBed.get(AlertService);
    expect(service).toBeTruthy();
  });
});
