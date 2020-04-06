import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { EngineeringTaskService } from './engineering-task.service';
import { EngineeringTask } from '../model/engineering-task';
import { Status } from '../model/status';

describe('EngineeringTaskService', () => {
  let injector: TestBed;
  let engineeringTaskService: EngineeringTaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        EngineeringTaskService,
      ]
    });

    injector = getTestBed();
    engineeringTaskService = injector.get(EngineeringTaskService);
    httpMock = injector.get(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: EngineeringTaskService = TestBed.get(EngineeringTaskService);
    expect(service).toBeTruthy();
  });

  const engineeringTasksDummyResponse = [
    { "id": 1, "name": 'ET1', "userStoryId": 1, "status": 'New', "estimatedHours": 30, "priority": 3, "userId": 1, "doneHours": 0, "description": 'desc' },
    { "id": 3, "name": 'ET2', "userStoryId": 2, "status": 'Active', "estimatedHours": 15, "priority": 2, "userId": 2, "doneHours": 5, "description": 'desc' },
    { "id": 3, "name": 'ET3', "userStoryId": 1, "status": 'Active', "estimatedHours": 10, "priority": 2, "userId": 3, "doneHours": 4, "description": 'desc' },
  ];

  it('getAllByUserStory should return data', () => {
    engineeringTaskService.getAllByUserStory(1).subscribe((res) => {
      expect(res.length).toBe(3);
      expect(JSON.stringify(res)).toEqual(JSON.stringify(engineeringTasksDummyResponse));
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/engineeringtask/userstory/1`);
    expect(req.request.method).toBe('GET');
    req.flush(engineeringTasksDummyResponse);
  });

  const engineeringTaskDummyResponse = [
    {
      "id": 1, "name": 'ET1', "userStoryId": 1, "status": 'New',
      "estimatedHours": 30, "priority": 3, "userId": 1, "doneHours": 0, "description": 'desc'
    },
  ];

  it('should get the correct Engineering Task', () => {
    engineeringTaskService.getById(1).subscribe((data: any) => {
      expect(data).toBe(engineeringTaskDummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/engineeringtask/1`);
    expect(req.request.method).toBe('GET');
    req.flush(engineeringTaskDummyResponse);
  });

  let engineeringTaskDummy = new EngineeringTask();
  engineeringTaskDummy.id = 1;
  engineeringTaskDummy.name = 'ET1';
  engineeringTaskDummy.userStoryId = 1;
  engineeringTaskDummy.status = Status.New;
  engineeringTaskDummy.estimatedHours = 30;
  engineeringTaskDummy.priority = 3;
  engineeringTaskDummy.userId = 1;
  engineeringTaskDummy.doneHours = 0;
  engineeringTaskDummy.description = 'desc';

  // it('should post the correct data', () => {
  //   engineeringTaskService.create(engineeringTaskDummy).subscribe((data: any) => {
  //     expect(data).toBe(engineeringTaskDummy);
  //   });

  //   const req = httpMock.expectOne(`${environment.apiUrl}/engineeringtask/create`);
  //   expect(req.request.method).toBe('POST');
  //   req.flush(engineeringTaskDummyResponse);
  // });

  it('should put the correct data', () => {
    engineeringTaskService.update(1, engineeringTaskDummy).subscribe((data: any) => {
      expect(data).toBe(engineeringTaskDummy);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/engineeringtask/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(engineeringTaskDummy);
  });

  it('should delete the correct data', () => {
    engineeringTaskService.delete(3).subscribe((data: any) => {
      expect(data).toBe(3);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/engineeringtask/3`);
    expect(req.request.method).toBe('DELETE');
    req.flush(3);
  });

});
