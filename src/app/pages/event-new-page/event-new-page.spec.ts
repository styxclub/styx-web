import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventNewPage } from './event-new-page';

describe('EventNewPage', () => {
  let component: EventNewPage;
  let fixture: ComponentFixture<EventNewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventNewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
