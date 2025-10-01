import { TestBed } from '@angular/core/testing';

import DialogAlertService from './dialog-alert-service';

describe('DialogService', () => {
  let service: DialogAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
