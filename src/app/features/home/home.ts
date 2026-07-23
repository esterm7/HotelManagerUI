import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/AuthService';
import { Service } from '../../core/services/service';
import { NavLayout } from '../../nav-layout/nav-layout';
import { FormError } from '../form-error/form-error';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { TipoCamera } from '../../core/enums/tipologia-camera-enum';
import { FormsModule } from '@angular/forms';
import { CameraDto } from '../../DTO/cameraDTO';
import { CamereLibere } from '../camere-libere/camere-libere';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-home',
  imports: [CommonModule, NavLayout, FormError, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
  private dialog = inject(Dialog);

  today = new Date().toISOString().split('T')[0];
  tipologie = Object.values(TipoCamera);

  prenotazioneDTO!: PrenotazioneDTO;

  constructor(private router: Router, private route: ActivatedRoute, public auth: AuthService, private service: Service) {
    this.prenotazioneDTO = new PrenotazioneDTO();
    this.prenotazioneDTO.dataPrenotazione = new Date();
    this.prenotazioneDTO.tipologiaCamera = null;
  }

  livelloPermesso!: string | null;


  vaiAPrenota() {
    this.router.navigate(['/prenotazione-create'], {
      state: { prenotazioneTemp: this.prenotazioneDTO }
    });
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
        this.prenotazioneDTO.costoCamera = result.tariffa;
      }
      this.vaiAPrenota();
      console.log('Login chiuso, risultato:', result);
    });
  }


  vaiAlCreaUtente() {
    this.router.navigate(['/utente-create']);
  };

  vaiAListaCamere() {
    this.router.navigate(['/camere-list'])
  };

  vaiAListaUtenti() {
    this.router.navigate(['/utenti-list'])
  };

  vaiAListaPrenotazioni() {
    this.router.navigate(['/prenotazioni-list']);
  }

  vaiAlCreaPrenotazione() {
    this.router.navigate(['prenotazione-create']);
  }

  vaiAlCreaCamera() {
    this.router.navigate(['/camera-create']);
  };

  vaiUpdateUtente() {
    this.router.navigate(['/utente-update', this.auth.getCodiceUtente()]);
  };

  ngOnInit(): void {
    this.livelloPermesso = this.auth.getLivelloPermesso();
  }

}