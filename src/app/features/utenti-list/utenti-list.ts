import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtenteDto } from '../../DTO/utenteDTO';
import { Service } from '../../core/services/service';
import { AuthService } from '../../core/services/AuthService';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { LivelloPermesso } from '../../core/enums/livello-permessi';
import { NavLayout } from '../../nav-layout/nav-layout';

@Component({
  selector: 'app-utenti-list',
  imports: [CommonModule, NgbPopoverModule, NavLayout ],
  templateUrl: './utenti-list.html',
  styleUrl: './utenti-list.css',
})
export class UtentiList implements OnInit {
  utenti: UtenteDto[] = [];
  constructor(private router: Router, private utenteService: Service, private route: ActivatedRoute, private cdr: ChangeDetectorRef, public auth: AuthService) { }

  dropdownOpen = signal(false);
  livelloPermesso!: LivelloPermesso | null;

  ngOnInit() {
    this.utenti = this.route.snapshot.data['utenti'];
    this.livelloPermesso = this.auth.getLivelloPermesso() ;
  };


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

          

          alert(`Utente ${utente.nome} ${utente.cognome} ${utente.codiceUtente} eliminato con successo!`);

          if (utente.codiceUtente === this.auth.currentUser()) {
            console.log('cancellazione del proprio utente - logout -> home')
            this.auth.logout();
          }
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          console.error('Errore durante l\'eliminazione dell\'utente: ', err.error);
          alert('Errore durante l\'eliminazione dell\'utente: \n' + err.error)
        }
      });
    }

  };

  vaiAlCreaUtente() {
    this.router.navigate(['/utente-create']);
  };
}
