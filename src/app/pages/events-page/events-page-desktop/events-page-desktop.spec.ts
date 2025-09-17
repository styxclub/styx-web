import { ComponentFixture, TestBed } from '@angular/core/testing';

import EventsPageDesktop from './events-page-desktop';

describe('EventsPage', () => {
  let component: EventsPageDesktop;
  let fixture: ComponentFixture<EventsPageDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsPageDesktop],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsPageDesktop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
