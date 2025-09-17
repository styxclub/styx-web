import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPageMobile } from './chat-page-mobile';

describe('ChatPageMobile', () => {
  let component: ChatPageMobile;
  let fixture: ComponentFixture<ChatPageMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPageMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatPageMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
