import { ComponentFixture, TestBed } from '@angular/core/testing';

import HomePageDesktop from './home-page-desktop';

describe('HomePage', () => {
  let component: HomePageDesktop;
  let fixture: ComponentFixture<HomePageDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageDesktop],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageDesktop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
