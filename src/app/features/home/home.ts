import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { UtenteLogin } from '../../features/utente-login/utente-login'
import { AuthService } from '../../core/services/AuthService';
import { Service } from '../../core/services/service';


@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
  private dialog = inject(Dialog);


  constructor(private router: Router, private route: ActivatedRoute, public auth: AuthService, private service: Service, private cdr: ChangeDetectorRef) { }
  dropdownOpen = signal(false);

  livelloPermessi!: string | null;

  openDropdown() {
    this.dropdownOpen.set(true);
    // console.log(this.auth.currentUser() + '\n'+ this.auth.getLivelloPermessi());
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
      this.cdr.detectChanges();

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

  vaiAListaPrenotazioni() {
    this.router.navigate(['/prenotazioni-list']);
  }

  vaiAlCreaPrenotazione() {
    this.router.navigate(['prenotazione-create']);
  }

  vaiAlCreaCamera() {
    this.router.navigate(['/camera-create']);
  };

  vaiUpdateUtente() {
    this.router.navigate(['/utente-update', this.auth.getCodiceUtente()]);
  };

  ngOnInit(): void {
    this.livelloPermessi = this.auth.getLivelloPermessi();
  }


  get isAdmin() {
    return this.auth.isAdmin();
  }

  get isGestore() {
    return this.auth.isGestore();
  }

  get isUtente() {
    return this.auth.isUtente();
  }


}