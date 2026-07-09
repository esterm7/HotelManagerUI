import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { rResolver } from './r-resolver';

describe('rResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => rResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
