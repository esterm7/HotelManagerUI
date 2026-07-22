import { Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../core/services/service';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { AuthService } from '../../core/services/AuthService';
import { NavLayout } from '../../nav-layout/nav-layout';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-prenotazione-list',
  imports: [NavLayout, NgbPopoverModule],
  templateUrl: './prenotazione-list.html',
  styleUrl: './prenotazione-list.css',
})
export class PrenotazioneList implements OnInit {
  prenotazioni: PrenotazioneDTO[] = [];

  livelloPermesso!: string | null;


  constructor(private router: Router, private route: ActivatedRoute, private service: Service, public auth: AuthService) { }


  ngOnInit() {
    this.prenotazioni = this.route.snapshot.data['prenotazioni'];
    console.log('Prenotazioni:', this.prenotazioni);
    this.livelloPermesso = this.auth.getLivelloPermesso();

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

}

