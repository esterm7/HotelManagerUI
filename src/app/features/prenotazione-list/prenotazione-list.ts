import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../core/services/service';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';

@Component({
  selector: 'app-prenotazione-list',
  imports: [],
  templateUrl: './prenotazione-list.html',
  styleUrl: './prenotazione-list.css',
})
export class PrenotazioneList implements OnInit{
  prenotazioni: PrenotazioneDTO[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private service: Service) { }

  ngOnInit() {
    this.prenotazioni = this.route.snapshot.data['prenotazioni'];
    console.log('Prenotazioni:', this.prenotazioni);
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
        }
      });
    }
  }

 vaiAlCreaPrenotazione() {
    this.router.navigate(['/prenotazione-create']);
  };
}

