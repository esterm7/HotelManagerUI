import { Component, OnInit, signal } from '@angular/core';
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
export class UtentiList {
  utenti: UtenteDto[] = [];
  constructor(private router: Router, private utenteService: Service, private route: ActivatedRoute, public auth: AuthService) { }

dropdownOpen = signal(false);
    livelloPermessi!: string | null;

  ngOnInit() {
    this.utenti = this.route.snapshot.data['utenti'];
     this.livelloPermessi = this.auth.getLivelloPermessi();
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
          console.log(response);
          alert(`Utente ${utente.nome} ${utente.cognome} ${utente.codiceUtente} eliminato con successo!`);
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          console.error('Errore durante l\'eliminazione dell\'utente: ', err.error);
        }
      });
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

}
