import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEnrolled } from './popup-enrolled';

describe('PopupEnrolled', () => {
  let component: PopupEnrolled;
  let fixture: ComponentFixture<PopupEnrolled>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupEnrolled]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEnrolled);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
