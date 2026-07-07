import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { UtentiList } from './features/utenti-list/utenti-list';
import { UtenteCreate } from './features/utente-create/utente-create';
import { UtenteUpdate } from './features/utente-update/utente-update';
import { CameraCreate } from './features/camera-create/camera-create';
import { CameraUpdate } from './features/camera-update/camera-update';
import {cameraListResolve, utenteListResolve} from './services/r-resolver';
import { CamereList } from './features/camere-list/camere-list';
import { UtenteLogin } from './features/utente-login/utente-login';


export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'utenti-list',
    component: UtentiList,
      resolve: { utenti: utenteListResolve}

  },
  {
    path: 'utente-create',
    component: UtenteCreate
  },

  {

    path: 'utente-login',
    component: UtenteLogin
  },
  {
    path: 'utente-update/:codiceUtente',
    component: UtenteUpdate
  },
  {
    path: 'camere-list',
    component: CamereList,
      resolve: { camere: cameraListResolve}
  },
  {
    path: 'camera-create',
    component: CameraCreate
  },
  {
    path: 'camera-update/:codiceCamera',
    component: CameraUpdate
  },
  {
    path: '**',
    redirectTo: 'home'
  }


];




