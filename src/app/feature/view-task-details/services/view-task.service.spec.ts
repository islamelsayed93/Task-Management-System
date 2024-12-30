import { TestBed } from '@angular/core/testing';

import { ViewTaskService } from './view-task.service';

describe('ViewTaskService', () => {
  let service: ViewTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
