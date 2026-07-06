import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtentiList } from './utenti-list';

describe('UtentiList', () => {
  let component: UtentiList;
  let fixture: ComponentFixture<UtentiList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtentiList],
    }).compileComponents();

    fixture = TestBed.createComponent(UtentiList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
