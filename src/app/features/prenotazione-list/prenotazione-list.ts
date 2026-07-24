import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Service } from '../../core/services/service';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { AuthService } from '../../core/services/AuthService';
import { NavLayout } from '../../nav-layout/nav-layout';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { StatoCheckin } from '../../core/enums/stato-checkin';
import { StatoPrenotazione } from '../../core/enums/stato-prenotazione';
import { Dialog } from '@angular/cdk/dialog';
import { PrenotazioneDetails } from '../prenotazione-details/prenotazione-details';




@Component({
  selector: 'app-prenotazione-list',
  imports: [NavLayout, NgbPopoverModule],
  templateUrl: './prenotazione-list.html',
  styleUrl: './prenotazione-list.css',
})


export class PrenotazioneList implements OnInit {
  prenotazioni: PrenotazioneDTO[] = [];

  livelloPermesso!: string | null;

  constructor(private router: Router, private route: ActivatedRoute, private service: Service, public auth: AuthService, private cdr: ChangeDetectorRef) { }
    private dialog = inject(Dialog);



  ngOnInit() {
    this.prenotazioni = this.route.snapshot.data['prenotazioni'];
    console.log('Prenotazioni:', this.prenotazioni);
    this.livelloPermesso = this.auth.getLivelloPermesso();

  }
openDetails(prenotazione: PrenotazioneDTO) {
  console.log(prenotazione);

  this.dialog.open(PrenotazioneDetails, {
    data: prenotazione
  });
}


  VaiAHome() {
    this.router.navigate(['/home']);
  }


    checkedIn(prenotazione: PrenotazioneDTO) {
    if (prenotazione.statoCheckin === StatoCheckin.CHECKED_IN) {
      alert('L\'utente ha già eseguito il checkin')
      return
    }
    prenotazione.statoCheckin = StatoCheckin.CHECKED_IN;
    prenotazione.statoPrenotazione = StatoPrenotazione.ATTIVO
    this.service.aggiornaPrenotazioneCheckin(prenotazione).subscribe({
      next: (response) => {
        console.log(response);
        alert('Checkin registrato correttamente');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
        console.error('Errore durante il checkin: ', err.error);
      }
    })
  }
 
  checkedOut(prenotazione: PrenotazioneDTO) {
    if (prenotazione.statoCheckin === StatoCheckin.CHECKED_OUT) {
      alert('L\'utente ha già eseguito il checkout')
      return
    }
    prenotazione.statoCheckin = StatoCheckin.CHECKED_OUT;
    prenotazione.statoPrenotazione = StatoPrenotazione.TERMINATO
    this.service.aggiornaPrenotazioneCheckin(prenotazione).subscribe({
      next: (response) => {
        console.log(response);
        alert('Checkout registrato correttamente');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
        console.error('Errore durante il checkout: ', err.error);
      }
    })
  }
 

  vaiAlCreaPrenotazione() {
    this.router.navigate(['/prenotazione-create']);
  };

  vaiUpdatePrenotazione(prenotazione: PrenotazioneDTO) {
    this.router.navigate(['prenotazione-update', prenotazione.codicePrenotazione]);
  }
}