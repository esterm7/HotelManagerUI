import { ChangeDetectorRef, inject, Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { Service } from '../../core/services/service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';
import { Location } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { CamereLibere } from '../camere-libere/camere-libere';
import { CameraDto } from '../../DTO/cameraDTO';
import { UtenteDto } from '../../DTO/utenteDTO';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TipoCamera } from '../../core/enums/tipologia-camera-enum';



@Component({
  selector: 'app-prenotazione-update',
  imports: [FormsModule, NgbPopoverModule ],
  templateUrl: './prenotazione-update.html',
  styleUrl: './prenotazione-update.css',
})
export class PrenotazioneUpdate implements OnInit {

  // private dialog = inject(Dialog);
  today = new Date().toISOString().split('T')[0];

    private dialog = inject(Dialog);

  prenotazioneDTO!: PrenotazioneDTO;

  costoCamera!: number | null;

    tipologie = Object.values(TipoCamera);
  

  constructor(private router: Router, private prenotazioneService: Service, private route: ActivatedRoute, public auth: AuthService, private cdr: ChangeDetectorRef, private location: Location) {
       this.prenotazioneDTO = new PrenotazioneDTO();
    this.prenotazioneDTO.dataPrenotazione = new Date();
    this.prenotazioneDTO.tipologiaCamera = null;
    this.prenotazioneDTO.codiceUtente = auth.getCodiceUtente();
  }

  dropdownOpen = signal(false);

  openDropdown() {
    this.dropdownOpen.set(true);
    // console.log(this.auth.currentUser() + '\n'+ this.auth.getLivelloPermessi());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
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

  ngOnInit() {
    const code = this.route.snapshot.params['codicePrenotazione'];
    this.prenotazioneService.getPrenotazioneByCode(code).subscribe({
      next: (response) => {
        this.prenotazioneDTO = Object.assign(new PrenotazioneDTO(), response);
        console.log('Prenotazione salvata:', this.prenotazioneDTO);

        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
        console.error('Errore: ', err.error);
      }
    });
  };

  updatePrenotazione() {
    this.prenotazioneDTO.inputValidate();
    if (this.prenotazioneDTO.dataPrenotazioneError || this.prenotazioneDTO.dataInizioError || this.prenotazioneDTO.dataFineError) {
      console.log('Errore di validazione dei campi');
      return;
    }
    console.log(this.prenotazioneDTO);
    this.prenotazioneService.aggiornaPrenotazione(this.prenotazioneDTO).subscribe({
      next: (response) => {
        console.log(response);
        alert('Prenotazione aggiornata');
        this.VaiAPaginaPrecedente();
      },
      error: (err) => {
        console.log(err);
        if (err.status == 400) {
          alert('Esiste già una prenotazione in atto per le date selezionate')
        }
        console.error('Errore durante il salvataggio della prenotazione ', err);
      },
      complete: () => {
        console.log('Richiesta completata');
      }
    });
  };
  codiceCameraValidate() {
    if (!this.prenotazioneDTO.codiceCamera || this.prenotazioneDTO.codiceCamera.trim() === '') {
      this.prenotazioneDTO.codiceCameraError = 'Codice camera non valido';
      return;
    }

    this.prenotazioneService.getCameraByCode(this.prenotazioneDTO.codiceCamera).subscribe({
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

  codiceUtenteValidate() {
    if (!this.prenotazioneDTO.codiceUtente || this.prenotazioneDTO.codiceUtente.trim() === '') {
      this.prenotazioneDTO.codiceUtenteError = 'Codice utente non valido';
      return;
    }

    this.prenotazioneService.getUtenteByCode(this.prenotazioneDTO.codiceUtente).subscribe({
      next: (response) => {
        this.prenotazioneDTO.codiceUtenteError = false;
        this.prenotazioneDTO.codiceUtente = Object.assign(new UtenteDto(), response).codiceUtente;
        this.cdr?.detectChanges();
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
  

    
  
  
    VaiAHome() {
      this.router.navigate(['/home']);
  
    };
  
    VaiAListaPrenotazioni() {
      this.router.navigate(['/prenotazione-list']);
    };
  
    VaiAPaginaPrecedente() {
      this.location.back();
    }


}








