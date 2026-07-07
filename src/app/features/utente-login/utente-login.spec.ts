import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtenteLogin } from './utente-login';

describe('UtenteLogin', () => {
  let component: UtenteLogin;
  let fixture: ComponentFixture<UtenteLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtenteLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(UtenteLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
