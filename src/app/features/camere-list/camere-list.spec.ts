import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamereList } from './camere-list';

describe('CamereList', () => {
  let component: CamereList;
  let fixture: ComponentFixture<CamereList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamereList],
    }).compileComponents();

    fixture = TestBed.createComponent(CamereList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
