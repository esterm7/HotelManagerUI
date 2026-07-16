import { Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../core/services/service';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { AuthService } from '../../core/services/AuthService';

@Component({
  selector: 'app-prenotazione-list',
  imports: [],
  templateUrl: './prenotazione-list.html',
  styleUrl: './prenotazione-list.css',
})
export class PrenotazioneList implements OnInit {
  prenotazioni: PrenotazioneDTO[] = [];


  dropdownOpen = signal(false);
  livelloPermessi!: string | null;


  constructor(private router: Router, private route: ActivatedRoute, private service: Service, public auth: AuthService) { }


  ngOnInit() {
    this.prenotazioni = this.route.snapshot.data['prenotazioni'];
    console.log('Prenotazioni:', this.prenotazioni);
    this.livelloPermessi = this.auth.getLivelloPermessi();

  }

  openDropdown() {
    this.dropdownOpen.set(true);
    // console.log(this.auth.currentUser() + '\n'+ this.auth.getLivelloPermessi());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }

  vaiAllUpdatePrenotazione(prenotazione: PrenotazioneDTO) {
    this.router.navigate(['/prenotazione-update', prenotazione.codicePrenotazione]);
  }

  VaiAHome() {
    this.router.navigate(['/home']);
  }

  deletePrenotazione(prenotazione: PrenotazioneDTO) {
    if (confirm(`Sei sicuro di voler eliminare la prenotazione ${prenotazione.codicePrenotazione} ? `)) {
      this.service.cancellaPrenotazione(prenotazione.codicePrenotazione).subscribe({
        next: (response) => {
          console.log(response);
          alert("Prenotazione eliminata");
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
          alert(err.error);
          console.error('Errore durante la cancellazione della prenotazione: ', err.error);
        }
      });
    }
  }

  vaiAlCreaPrenotazione() {
    this.router.navigate(['/prenotazione-create']);
  };

  vaiUpdatePrenotazione(prenotazione: PrenotazioneDTO) {
    this.router.navigate(['prenotazione-update', prenotazione.codicePrenotazione]);
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

