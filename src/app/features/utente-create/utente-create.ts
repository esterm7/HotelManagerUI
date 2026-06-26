import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteDto } from '../../DTO/utenteDTO';
import { FormsModule } from '@angular/forms';
import { UtenteService } from '../../services/service';

@Component({
  selector: 'app-utente-create',
  imports: [FormsModule],
  templateUrl: './utente-create.html',
  styleUrl: './utente-create.css',
})


//fare i controlli di validazione dei campi,
// se non sono validi non fare il submit del form, altrimenti fare il submit 
// e stampare in console i dati della camera da salvare

export class UtenteCreate {

  utenteDTO!: UtenteDto;

  constructor(private router: Router, private utenteService: UtenteService) {
    this.utenteDTO = new UtenteDto();
    this.utenteDTO.livelloPermessi = 1; // Imposta il valore predefinito a 1 (Utente) 
  }

  salvaUtente() {
    console.log(this.utenteDTO.dataNascita);
    this.utenteDTO.inputValidate(this.utenteDTO);
    if (this.utenteDTO.codiceUtenteError || this.utenteDTO.nomeError || this.utenteDTO.cognomeError || this.utenteDTO.dataNascitaError || this.utenteDTO.codiceFiscaleError || this.utenteDTO.livelloPermessiError) {
      console.log('Errore di validazione dei campi');
      return;
    }
    this.utenteDTO.creaCodiceUtente();
    this.utenteService.salva(this.utenteDTO);
  }

  VaiAHome() {
    this.router.navigate(['/home']);
  }

}
