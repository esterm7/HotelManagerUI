import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../core/services/service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';
import { Location } from '@angular/common';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { CameraDto } from '../../DTO/cameraDTO';

@Component({
  selector: 'app-prenotazione-create',
  imports: [FormsModule],
  templateUrl: './prenotazione-create.html',
  styleUrl: './prenotazione-create.css',
})
export class PrenotazioneCreate {

  prenotazioneDTO!: PrenotazioneDTO;

  constructor(private router: Router, private service: Service, private location: Location, public auth: AuthService, private cdr: ChangeDetectorRef) {
    this.prenotazioneDTO = new PrenotazioneDTO();
    this.prenotazioneDTO.dataPrenotazione = new Date();
    this.prenotazioneDTO.codiceUtente = auth.getCodiceUtente();
  }

  salvaPrenotazione() {
    if (!this.prenotazioneDTO.codiceUtente) {
      console.error('codiceUtente nullo');
      return;
    }
    this.codiceCameraValidate();
    this.prenotazioneDTO.inputValidate();
    if (this.prenotazioneDTO.codiceCameraError || this.prenotazioneDTO.dataInizioError || this.prenotazioneDTO.dataFineError || this.prenotazioneDTO.codiceUtenteError) {
      console.log('Errore di validazione dei campi');
      return;
    }
    this.service.salvaPrenotazione(this.prenotazioneDTO).subscribe({
      next: (response) => {
        console.log(response);
        this.prenotazioneDTO = Object.assign(new PrenotazioneDTO(), response); // Assegna il codice prenotazione restituito dal backend
        console.log(this.prenotazioneDTO);
        alert('Prenotazione salvata con successo! \nCodice prenotazione: ' + this.prenotazioneDTO.codicePrenotazione);
        this.VaiAPaginaPrecedente();
      },
      error: (err) => {
        console.log(err);
        this.prenotazioneDTO.codiceCameraError = err.error;
        alert(err.error);
        console.error('Errore durante il salvataggio della prenotazione: ', err.error);
      },
      complete: () => {
        console.log('Richiesta completata');
      }
    });
  };

  VaiAPaginaPrecedente() {
    this.location.back();
  }

  resetForm() {
    this.prenotazioneDTO.codiceCamera = '';
    this.prenotazioneDTO.dataInizio = null;
    this.prenotazioneDTO.dataFine = null;

  }

  codiceCameraValidate() {
    if (!this.prenotazioneDTO.codiceCamera || this.prenotazioneDTO.codiceCamera.trim() === '') {
      this.prenotazioneDTO.codiceCameraError = 'Codice camera non valido';
      return;
    }

    this.service.getCameraByCode(this.prenotazioneDTO.codiceCamera).subscribe({
      next: (response) => {
        this.prenotazioneDTO.codiceCameraError = false;
        this.prenotazioneDTO.codiceCamera = Object.assign(new CameraDto(), response).codiceCamera;
        console.log('Camera caricata:', this.prenotazioneDTO.codiceCamera);
        this.cdr?.detectChanges();
      },
      error: (err) => {
        this.prenotazioneDTO.codiceCameraError = 'Codice camera non trovato'
        console.error('Errore: ', err);
      }
    });
  }

}