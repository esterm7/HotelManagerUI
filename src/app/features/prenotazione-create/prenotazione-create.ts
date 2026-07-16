import { ChangeDetectorRef, inject, Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../core/services/service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';
import { Location } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { CameraDto } from '../../DTO/cameraDTO';
import { UtenteDto } from '../../DTO/utenteDTO';
import { TipoCamera } from '../../core/enums/tipologia-camera-enum';
import { CamereLibere } from '../camere-libere/camere-libere';

@Component({
  selector: 'app-prenotazione-create',
  imports: [FormsModule],
  templateUrl: './prenotazione-create.html',
  styleUrl: './prenotazione-create.css',
})
export class PrenotazioneCreate {
  private dialog = inject(Dialog);

  prenotazioneDTO!: PrenotazioneDTO;
  costoCamera!: number | null;

  tipologie = Object.values(TipoCamera);

  livelloPermessi!: string | null;

  constructor(private router: Router, private service: Service, private location: Location, public auth: AuthService, private cdr: ChangeDetectorRef) {
    this.prenotazioneDTO = new PrenotazioneDTO();
    this.prenotazioneDTO.dataPrenotazione = new Date();
    this.prenotazioneDTO.tipologiaCamera = null;
    this.prenotazioneDTO.codiceUtente = auth.getCodiceUtente();
  }

  apriSelezioneCamera() {
    this.prenotazioneDTO.inputValidate();
    if (this.prenotazioneDTO.dataInizioError || this.prenotazioneDTO.dataFineError || this.prenotazioneDTO.tipologiaCameraError) {
      alert('Campi necessari per la selezione della camera non validi');
      return;
    }
    const ref = this.dialog.open<CameraDto | null>(CamereLibere, {
      data: {
        prenotazioneTemp: this.prenotazioneDTO,
      }
    });

    ref.closed.subscribe(result => {
      if (result) {
        console.log('Camera scelta:', result.codiceCamera);
        this.prenotazioneDTO.codiceCamera = result.codiceCamera;
        this.costoCamera = result.tariffa;
      }
      console.log('Login chiuso, risultato:', result);
      this.calcoloCostoComplessivo();
      this.cdr.detectChanges();
    });
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
    this.calcoloCostoComplessivo();
    this.service.salvaPrenotazione(this.prenotazioneDTO).subscribe({
      next: (response) => {
        console.log(response);
        this.prenotazioneDTO = Object.assign(new PrenotazioneDTO(), response); // Assegna il codice prenotazione restituito dal backend
        console.log(this.prenotazioneDTO);
        alert('Prenotazione salvata con successo! \nCodice prenotazione: ' + this.prenotazioneDTO.codicePrenotazione + '\nCosto Totale: €' + this.prenotazioneDTO.costoComplessivo);
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
    this.prenotazioneDTO.dataInizio = null;
    this.prenotazioneDTO.dataFine = null;
    this.prenotazioneDTO.tipologiaCamera = null;
    this.prenotazioneDTO.codiceCamera = null;
    this.costoCamera = null;

    this.prenotazioneDTO.dataInizioError = false;
    this.prenotazioneDTO.dataFineError = false;
    this.prenotazioneDTO.tipologiaCameraError = false;
    this.prenotazioneDTO.codiceCameraError = false;

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
        this.costoCamera = Object.assign(new CameraDto(), response).tariffa;
        console.log('Camera caricata:', this.prenotazioneDTO.codiceCamera);
        this.cdr?.detectChanges();
      },
      error: (err) => {
        this.prenotazioneDTO.codiceCameraError = 'Codice camera non trovato'
        console.error('Errore: ', err);
      }
    });
  }

  ngOnInit() {
    this.livelloPermessi = this.auth.getLivelloPermessi();
  }

  codiceUtenteValidate() {
    if (!this.prenotazioneDTO.codiceUtente || this.prenotazioneDTO.codiceUtente.trim() === '') {
      this.prenotazioneDTO.codiceUtenteError = 'Codice utente non valido';
      return;
    }

    this.service.getUtenteByCode(this.prenotazioneDTO.codiceUtente).subscribe({
      next: (response) => {
        this.prenotazioneDTO.codiceUtenteError = false;
        this.prenotazioneDTO.codiceUtente = Object.assign(new UtenteDto(), response).codiceUtente;
      },
      error: (err) => {
        this.prenotazioneDTO.codiceUtenteError = 'Codice utente non trovato'
        console.error('Errore:', err);
      }
    })

  };

  calcoloCostoComplessivo() {
    if (this.prenotazioneDTO.dataInizio && this.prenotazioneDTO.dataFine && this.costoCamera) {
      const dataInizio = new Date(this.prenotazioneDTO.dataInizio);
      const dataFine = new Date(this.prenotazioneDTO.dataFine);
      const differenzaGiorni = (dataFine.getTime() - dataInizio.getTime()) / (1000 * 60 * 60 * 24);
      this.prenotazioneDTO.costoComplessivo = differenzaGiorni * this.costoCamera;
    }
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
