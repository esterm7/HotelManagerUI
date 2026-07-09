import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtenteDto } from '../../DTO/utenteDTO';
import { Service } from '../../core/services/service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utente-update',
  imports: [FormsModule],
  templateUrl: './utente-update.html',
  styleUrl: './utente-update.css',
})
export class UtenteUpdate implements OnInit {

  utenteDTO!: UtenteDto;

  
  confermaPassword!: string;
  confermaPasswordError!: boolean | string;

  constructor(private router: Router, private utenteService: Service, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const codice = this.route.snapshot.params['codiceUtente'];
    this.utenteService.getUtenteByCode(codice).subscribe({
      next: (response) => {
        this.utenteDTO = Object.assign(new UtenteDto(), response);
        console.log('Utente caricato:', this.utenteDTO);
      },
      error: (err) => {
        console.log(err);
        console.error('Errore: ', err.error);
      }
    });
  };

  updateUtente() {
    this.utenteDTO.inputValidate();
    if (this.utenteDTO.nomeError || this.utenteDTO.cognomeError || this.utenteDTO.dataNascitaError || this.utenteDTO.codiceFiscaleError || this.utenteDTO.livelloPermessiError) {
      console.log('Errore di validazione dei campi');
      return;
    }
    console.log(this.utenteDTO);
    this.utenteService.aggiornaUtente(this.utenteDTO).subscribe({
      next: (response) => {
        console.log(response);
        alert('Utente aggiornato con successo!');
        this.VaiAListaUtenti();
      },
      error: (err) => {
        console.log(err);
        alert(err.error);
        console.error('Errore durante il salvataggio dell\'utente: ', err.error);
      },
      complete: () => {
        console.log('Richiesta completata');
      }
    });
  };


  VaiAHome() {
    this.router.navigate(['/home']);

  };

  VaiAListaUtenti() {
    this.router.navigate(['/utenti-list']);
  };
}

