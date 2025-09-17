import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageMobile } from './home-page-mobile';

describe('HomePageMobile', () => {
  let component: HomePageMobile;
  let fixture: ComponentFixture<HomePageMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageMobile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
