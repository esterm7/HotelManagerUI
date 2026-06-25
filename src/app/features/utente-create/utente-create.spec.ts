import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtenteCreate } from './utente-create';

describe('UtenteCreate', () => {
  let component: UtenteCreate;
  let fixture: ComponentFixture<UtenteCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtenteCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(UtenteCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
