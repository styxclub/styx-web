import { TestBed } from '@angular/core/testing';

import ClassMapperService from './class-mapper-service';

describe('ClassMapperService', () => {
  let service: ClassMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
