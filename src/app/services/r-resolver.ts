import {inject} from '@angular/core';
import { ResolveFn } from '@angular/router';
import {Service} from '../services/service';

export const cameraListResolve: ResolveFn<any> = () => {
  return inject (Service).getAllCamere();
};



