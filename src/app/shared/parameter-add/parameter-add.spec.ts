import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterAdd } from './parameter-add';

describe('ParameterAdd', () => {
  let component: ParameterAdd;
  let fixture: ComponentFixture<ParameterAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
