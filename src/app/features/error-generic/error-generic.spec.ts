import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorGeneric } from './error-generic';

describe('ErrorGeneric', () => {
  let component: ErrorGeneric;
  let fixture: ComponentFixture<ErrorGeneric>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorGeneric],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorGeneric);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
