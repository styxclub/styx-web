import { ComponentFixture, TestBed } from '@angular/core/testing';

import ChatPageDesktop from './chat-page-desktop';

describe('ChatPage', () => {
  let component: ChatPageDesktop;
  let fixture: ComponentFixture<ChatPageDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPageDesktop],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPageDesktop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
