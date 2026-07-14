import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotazioneList } from './prenotazione-list';

describe('PrenotazioneList', () => {
  let component: PrenotazioneList;
  let fixture: ComponentFixture<PrenotazioneList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrenotazioneList],
    }).compileComponents();

    fixture = TestBed.createComponent(PrenotazioneList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
