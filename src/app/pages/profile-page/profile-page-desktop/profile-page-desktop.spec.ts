import { ComponentFixture, TestBed } from '@angular/core/testing';

import ProfilePageDesktop from './profile-page-desktop';

describe('ProfilePage', () => {
  let component: ProfilePageDesktop;
  let fixture: ComponentFixture<ProfilePageDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePageDesktop],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePageDesktop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
