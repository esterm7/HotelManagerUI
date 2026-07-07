import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import {UtenteLogin} from '../../features/utente-login/utente-login'
 
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  private dialog = inject(Dialog);

  constructor(private router: Router, private route: ActivatedRoute) { }

  openLogin() {
    const ref = this.dialog.open(UtenteLogin, {
      panelClass: 'login-dialog-panel'
    });

    ref.closed.subscribe(result => {
      console.log('Login chiuso, risultato:', result);
    });
  }

  vaiAlCreaUtente() {
    this.router.navigate(['/utente-create']);
  };

  vaiAListaCamere() {
    this.router.navigate(['/camere-list'])
  };

  vaiAListaUtenti() {
    this.router.navigate(['/utenti-list'])
  };


  vaiAlCreaCamera() {
    this.router.navigate(['/camera-create']);
  };


}
