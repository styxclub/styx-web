import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParameterAdd } from './event-parameter-add';

describe('EventParameterAdd', () => {
  let component: EventParameterAdd;
  let fixture: ComponentFixture<EventParameterAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventParameterAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventParameterAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
