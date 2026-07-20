import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { Service } from '../../core/services/service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';
import { Location } from '@angular/common';
import { CameraDto } from '../../DTO/cameraDTO';
import { UtenteDto } from '../../DTO/utenteDTO';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-prenotazione-update',
  imports: [FormsModule, NgbPopoverModule ],
  templateUrl: './prenotazione-update.html',
  styleUrl: './prenotazione-update.css',
})
export class PrenotazioneUpdate implements OnInit {


  prenotazioneDTO!: PrenotazioneDTO;

  costoCamera!: number;

  constructor(private router: Router, private prenotazioneService: Service, private route: ActivatedRoute, public auth: AuthService, private cdr: ChangeDetectorRef, private location: Location) {
  }

  dropdownOpen = signal(false);

  openDropdown() {
    this.dropdownOpen.set(true);
    // console.log(this.auth.currentUser() + '\n'+ this.auth.getLivelloPermessi());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
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
        alert(err.error);
        console.error('Errore durante il salvataggio della prenotazione ', err.error);
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








