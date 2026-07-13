import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioneCreate } from './prenotazione-create';

describe('PrenotazioneCreate', () => {
  let component: PrenotazioneCreate;
  let fixture: ComponentFixture<PrenotazioneCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrenotazioneCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(PrenotazioneCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
