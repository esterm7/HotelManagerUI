import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { UtenteCreate } from './features/utente-create/utente-create';
import { CameraCreate } from './features/camera-create/camera-create';



export const routes: Routes = [
  {
    path: 'home',
    component: Home

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
  path: 'camera-create',
  component: CameraCreate
},

{
  path: '**',
  redirectTo: 'home'
}

];




