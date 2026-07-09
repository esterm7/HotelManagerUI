import {inject} from '@angular/core';
import { ResolveFn } from '@angular/router';
import {Service} from './service';

export const cameraListResolve: ResolveFn<any> = () => {
  return inject (Service).getAllCamere();
};
export const utenteListResolve: ResolveFn<any> = () => {
  return inject (Service).getAllUtenti();
};



