import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtenteDto } from '../../DTO/utenteDTO';
import { Service } from '../../core/services/service';
import { AuthService } from '../../core/services/AuthService';

@Component({
  selector: 'app-utenti-list',
  imports: [CommonModule],
  templateUrl: './utenti-list.html',
  styleUrl: './utenti-list.css',
})
export class UtentiList implements OnInit {
  utenti: UtenteDto[] = [];
  constructor(private router: Router, private utenteService: Service, private route: ActivatedRoute, private cdr: ChangeDetectorRef, public auth: AuthService) { }

  dropdownOpen = signal(false);
  livelloPermessi!: string | null;

  ngOnInit() {
    this.utenti = this.route.snapshot.data['utenti'];
    this.livelloPermessi = this.auth.getLivelloPermessi();
  };

  openDropdown() {
    this.dropdownOpen.set(true);
    // console.log(this.auth.currentUser() + '\n'+ this.auth.getLivelloPermessi());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }

  VaiAHome() {
    this.router.navigate(['/home']);
  };

  vaiUpdateUtente(utente: UtenteDto) {
    this.router.navigate(['/utente-update', utente.codiceUtente]);
  };

  deleteUtente(utente: UtenteDto) {
    if (confirm(`Sei sicuro di voler eliminare l'utente ${utente.nome} ${utente.cognome} ${utente.codiceUtente}?`)) {
      this.utenteService.deleteUtente(utente.codiceUtente).subscribe({
        next: (response) => {
          console.log(response);
          this.cdr.detectChanges();
          alert(`Utente ${utente.nome} ${utente.cognome} ${utente.codiceUtente} eliminato con successo!`);
        },
        error: (err) => {
          console.log(err);
          console.error('Errore durante l\'eliminazione dell\'utente: ', err.error);
          alert('Errore durante l\'eliminazione dell\'utente: \n' + err.error)
        }
      });
    }
    if (utente.codiceUtente === String(this.auth.currentUser())) {
      console.log('cancellazione del proprio utente - logout -> home')
      this.auth.logout();
    }
  };

  vaiAlCreaUtente() {
    this.router.navigate(['/utente-create']);
  };

  permissionLabels: Record<number, string> = {
    3: 'Utente',
    2: 'Gestore',
    1: 'Admin'
  };

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
