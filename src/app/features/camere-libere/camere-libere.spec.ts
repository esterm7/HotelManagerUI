import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamereLibere } from './camere-libere';

describe('CamereLibere', () => {
  let component: CamereLibere;
  let fixture: ComponentFixture<CamereLibere>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamereLibere],
    }).compileComponents();

    fixture = TestBed.createComponent(CamereLibere);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
