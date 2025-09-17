import { ComponentFixture, TestBed } from '@angular/core/testing';

import ProfilePageMobile from './profile-page-mobile';

describe('ProfilePageMobile', () => {
  let component: ProfilePageMobile;
  let fixture: ComponentFixture<ProfilePageMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePageMobile],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePageMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
