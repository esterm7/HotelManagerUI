import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteDto } from '../../DTO/utenteDTO';
import { FormsModule } from '@angular/forms';
import { Service } from '../../services/service';

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

  constructor(private router: Router, private utenteService: Service) {
    this.utenteDTO = new UtenteDto();
    this.utenteDTO.livelloPermessi = 1; // Imposta il valore predefinito a 1 (Utente) 
  }

  salvaUtente() {
    this.utenteDTO.inputValidate(this.utenteDTO);
    if (this.utenteDTO.nomeError || this.utenteDTO.cognomeError || this.utenteDTO.dataNascitaError || this.utenteDTO.codiceFiscaleError || this.utenteDTO.livelloPermessiError) {
      console.log('Errore di validazione dei campi');
      return;
    }
    this.utenteService.salvaUtente(this.utenteDTO).subscribe({
      next: (response) => {
        this.utenteDTO.codiceUtente = response as string; // Assuming the response is the codiceUtente
        alert('Utente salvato con successo! \nCodice utente: ' + this.utenteDTO.codiceUtente);
        this.VaiAHome();
      },
      error: (err) => {
        console.error('Errore durante il salvataggio dell\'utente', err);
      },
      complete: () => {
        console.log('Richiesta completata');
      }
    });
  };


  VaiAHome() {
    this.router.navigate(['/home']);
  }

  resetForm() {
    this.utenteDTO.nome = '';
    this.utenteDTO.cognome = '';
    this.utenteDTO.dataNascita = '';
    this.utenteDTO.codiceFiscale = '';
    this.utenteDTO.livelloPermessi = 1; // Imposta il valore predefinito a 1 (Utente)
    this.utenteDTO.codiceUtente = '';

    //resetto gli errori
    this.utenteDTO.codiceUtenteError = false;
    this.utenteDTO.nomeError = false;
    this.utenteDTO.cognomeError = false;
    this.utenteDTO.dataNascitaError = false;
    this.utenteDTO.codiceFiscaleError = false;
    this.utenteDTO.livelloPermessiError = false;
  }
  
}
