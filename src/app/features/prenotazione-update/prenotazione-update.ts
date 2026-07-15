import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { Service } from '../../core/services/service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';
import { Location } from '@angular/common';


@Component({
  selector: 'app-prenotazione-update',
  imports: [FormsModule],
  templateUrl: './prenotazione-update.html',
  styleUrl: './prenotazione-update.css',
})
export class PrenotazioneUpdate implements OnInit{

prenotazioneDTO! : PrenotazioneDTO;

constructor(private router: Router, private prenotazioneService: Service, private route: ActivatedRoute, public auth: AuthService, private cdr: ChangeDetectorRef, private location: Location) {
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
  
    updateUtente() {
      this.prenotazioneDTO.inputValidate();
      if (this.prenotazioneDTO.dataPrenotazioneError || this.prenotazioneDTO.dataInizioError|| this.prenotazioneDTO.dataFineError) {
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
  
  






