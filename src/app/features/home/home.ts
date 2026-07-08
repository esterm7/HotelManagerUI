import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { UtenteLogin } from '../../features/utente-login/utente-login'
import { AuthService } from '../../services/AuthService';
import { Service } from '../../services/service';
import { UtenteDto } from '../../DTO/utenteDTO';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {
  private dialog = inject(Dialog);

  utenteDto!: UtenteDto | null;

  constructor(private router: Router, private route: ActivatedRoute, public auth: AuthService, private service: Service) { }
  dropdownOpen = signal(false);


  openDropdown() {
    this.dropdownOpen.set(true);
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }



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

  vaiUpdateUtente() {
    console.log('modmodmod'+this.service.getUtenteByCode(String(this.auth.currentUser)));
      this.router.navigate(['/utente-update', this.service.getUtenteByCode(String(this.auth.currentUser))]);
    };

}
