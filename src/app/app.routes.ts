import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { UtenteCreate } from './features/utente-create/utente-create';
import { UtenteUpdate } from './features/utente-update/utente-update';
import { UtentiList } from './features/utenti-list/utenti-list';
import { CameraCreate } from './features/camera-create/camera-create';
import { cameraListResolve, utenteListResolve } from './services/r-resolver';
import { CameraUpdate } from './features/camera-update/camera-update';




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
<<<<<<< HEAD
    component: CameraCreate
=======
    component: CameraUpdate
>>>>>>> b384282214b0db09944d935150014c3e3f8d3e1c
  },
  {
    path: 'home',
    component: Home,
    resolve: { camere: cameraListResolve }
  },
  {
    path: 'utenti-list',
    component: UtentiList,
    resolve: { utenti: utenteListResolve }
  },
  {
    path: '**',
    redirectTo: 'home'
  }


];




