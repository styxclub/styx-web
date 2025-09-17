import { TestBed } from '@angular/core/testing';

import { ChatPageService } from './chat-page-service';

describe('ChatPageService', () => {
  let service: ChatPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
