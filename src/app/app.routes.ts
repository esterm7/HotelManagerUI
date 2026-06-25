import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { UtenteCreate } from './features/utente-create/utente-create';



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
  }
];




