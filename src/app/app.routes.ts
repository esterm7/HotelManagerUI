import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { UtenteCreate } from './features/utente-create/utente-create';
import { CameraCreate } from './features/camera-create/camera-create';
import { UtenteUpdate } from './features/utente-update/utente-update';



export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home

  },
  {
    path: 'utente-create',
    component: UtenteCreate
  },
  {
    path: 'utente-update',
    component: UtenteUpdate
  },
  {
    path: 'camera-create',
    component: CameraCreate
  },

  {
    path: '**',
    redirectTo: 'home'
  }

];




