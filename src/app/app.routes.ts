import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { UtentiList } from './features/utenti-list/utenti-list';
import { UtenteCreate } from './features/utente-create/utente-create';
import { UtenteUpdate } from './features/utente-update/utente-update';
import { CameraCreate } from './features/camera-create/camera-create';
import { CameraUpdate } from './features/camera-update/camera-update';
import { cameraListResolve, prenotazioneListResolve, utenteListResolve } from './core/services/r-resolver';
import { CamereList } from './features/camere-list/camere-list';
import { UtenteLogin } from './features/utente-login/utente-login';
import { authGuard } from './core/guards/auth-guard';
import { PrenotazioneCreate } from './features/prenotazione-create/prenotazione-create';
import { PrenotazioneList } from './features/prenotazione-list/prenotazione-list';
import { ErrorGeneric } from './features/error-generic/error-generic';
import { CamereLibere } from './features/camere-libere/camere-libere';
import { PrenotazioneUpdate } from './features/prenotazione-update/prenotazione-update';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'errore',
    component: ErrorGeneric,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'utenti-list',
    component: UtentiList,
    resolve: { utenti: utenteListResolve },
    canActivate: [authGuard]

  },
  {
    path: 'utente-create',
    component: UtenteCreate,
  },
  {

    path: 'utente-login',
    component: UtenteLogin,
  },
  {
    path: 'utente-update/:codiceUtente',
    component: UtenteUpdate
  },
  {
    path: 'camere-list',
    component: CamereList,
    resolve: { camere: cameraListResolve }
  },
  {
    path: 'camera-create',
    component: CameraCreate,
    canActivate: [authGuard]
  },
  {
    path: 'camera-update/:codiceCamera',
    component: CameraUpdate,
    canActivate: [authGuard]
  },
  {
    path: 'prenotazione-update/:codicePrenotazione',
    component: PrenotazioneUpdate
  },
  {
    path: 'prenotazioni-list',
    component: PrenotazioneList,
    resolve: { prenotazioni: prenotazioneListResolve }
  },
  {
    path: 'prenotazione-create',
    component: PrenotazioneCreate
  },
  {
    path: 'camere-libere',
    component: CamereLibere
  },
  {
    path: '**',
    redirectTo: 'home'
  }

];




