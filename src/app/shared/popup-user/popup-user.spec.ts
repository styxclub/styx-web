import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUser } from './popup-user';

describe('PopupUser', () => {
  let component: PopupUser;
  let fixture: ComponentFixture<PopupUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
