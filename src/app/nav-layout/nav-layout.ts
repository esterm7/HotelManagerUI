import { Component, signal, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/AuthService';
import { Dialog } from '@angular/cdk/dialog';
import { UtenteLogin } from '../features/utente-login/utente-login'


@Component({
  selector: 'app-nav-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-layout.html',
  styleUrl: './nav-layout.css',
})


export class NavLayout {
  private dialog = inject(Dialog);

  dropdownOpen = signal(false);

  constructor(private router: Router, public auth: AuthService, private cdr: ChangeDetectorRef) { }

  openLogin() {
    const ref = this.dialog.open(UtenteLogin, {
      panelClass: 'login-dialog-panel'
    });

    ref.closed.subscribe(result => {
      console.log('Login chiuso, risultato:', result);
      this.dropdownOpen.set(false);
      this.cdr.detectChanges();

    });
  }

  openDropdown() { this.dropdownOpen.set(true); }
  closeDropdown() { this.dropdownOpen.set(false); }

  vaiUpdateUtente() {
    const codice = this.auth.getCodiceUtente(); // sostituisci con il metodo/signal corretto
    this.router.navigate(['/utente-update', codice]);
  }

}














