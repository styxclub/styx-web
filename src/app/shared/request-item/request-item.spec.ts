import { ComponentFixture, TestBed } from '@angular/core/testing';

import RequestItem from './request-item';

describe('EventItem', () => {
  let component: RequestItem;
  let fixture: ComponentFixture<RequestItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestItem],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
