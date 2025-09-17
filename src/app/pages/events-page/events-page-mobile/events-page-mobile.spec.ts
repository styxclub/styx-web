import { ComponentFixture, TestBed } from '@angular/core/testing';

import EventsPageMobile from './events-page-mobile';

describe('EventsPageMobile', () => {
  let component: EventsPageMobile;
  let fixture: ComponentFixture<EventsPageMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsPageMobile],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsPageMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
