import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtenteUpdate } from './utente-update';

describe('UtenteUpdate', () => {
  let component: UtenteUpdate;
  let fixture: ComponentFixture<UtenteUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtenteUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(UtenteUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
