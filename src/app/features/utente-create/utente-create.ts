import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utente-create',
  imports: [],
  templateUrl: './utente-create.html',
  styleUrl: './utente-create.css',
})
export class UtenteCreate {
      constructor(private router: Router) {}

  VaiAHome() {
    this.router.navigate(['/home']);
  }
 
}
