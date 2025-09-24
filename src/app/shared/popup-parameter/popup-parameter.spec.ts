import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupParameter } from './popup-parameter';

describe('PopupParameter', () => {
  let component: PopupParameter;
  let fixture: ComponentFixture<PopupParameter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupParameter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupParameter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
