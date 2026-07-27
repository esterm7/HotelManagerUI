import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../core/services/service';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-prenotazione-details',
  imports: [FormsModule, NgbPopover],
  templateUrl: './prenotazione-details.html',
  styleUrl: './prenotazione-details.css',
})
export class PrenotazioneDetails {  

  private dialogRef = inject(DialogRef<Boolean>);
  
  prenotazioneDTO = inject<PrenotazioneDTO>(DIALOG_DATA);

  constructor(private router: Router, private prenotazioneService: Service, private cdr: ChangeDetectorRef, public auth: AuthService) {
  }


  ngOnInit() {
       console.log('Prenotazione ricevuta:', this.prenotazioneDTO);
  };
 
  chiudi() {
    this.dialogRef.close(false);
  }

  
    deletePrenotazione(prenotazione: PrenotazioneDTO) {
      if (confirm(`Sei sicuro di voler eliminare la prenotazione ${prenotazione.codicePrenotazione} ? `)) {
        this.prenotazioneService.cancellaPrenotazione(prenotazione.codicePrenotazione).subscribe({
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

      vaiAllUpdatePrenotazione(prenotazione: PrenotazioneDTO) {
    this.router.navigate(['/prenotazione-update', prenotazione.codicePrenotazione]);
  }
}


