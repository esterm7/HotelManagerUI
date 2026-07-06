import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { UtentiList } from './features/utenti-list/utenti-list';
import { UtenteCreate } from './features/utente-create/utente-create';
import { UtenteUpdate } from './features/utente-update/utente-update';
import { CameraCreate } from './features/camera-create/camera-create';
import { CameraUpdate } from './features/camera-update/camera-update';
import {cameraListResolve, utenteListResolve} from './services/r-resolver';
import { CamereList } from './features/camere-list/camere-list';




export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'utente-create',
    component: UtenteCreate
  },
  {
    path: 'utente-update/:codiceUtente',
    component: UtenteUpdate
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
    path: 'camere-list',
    component: CamereList,
      resolve: { camere: cameraListResolve}

  },
  
  {
    path: 'home',
    component: Home,
    resolve: { camere: cameraListResolve}
  },
  {
    path: '**',
    redirectTo: 'home'
  }


];




