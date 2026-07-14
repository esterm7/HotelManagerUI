import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioneUpdate } from './prenotazione-update';

describe('PrenotazioneUpdate', () => {
  let component: PrenotazioneUpdate;
  let fixture: ComponentFixture<PrenotazioneUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrenotazioneUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(PrenotazioneUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
