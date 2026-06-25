import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utente-update',
  imports: [],
  templateUrl: './utente-update.html',
  styleUrl: './utente-update.css',
})
export class UtenteUpdate {
  constructor(private router: Router) { }

  VaiAHome() {
    this.router.navigate(['/home']);

  }
}
