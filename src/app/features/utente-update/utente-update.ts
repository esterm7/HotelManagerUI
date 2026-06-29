import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteDto } from '../../DTO/utenteDTO';
import { Service } from '../../services/service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utente-update',
  imports: [FormsModule],
  templateUrl: './utente-update.html',
  styleUrl: './utente-update.css',
})
export class UtenteUpdate {

  utenteDTO!: UtenteDto;

  constructor(private router: Router, private Service: Service) {
    // if (this.Service.getUtenteByCode() !== null) {
    //   this.utenteDTO = this.Service.getUtenteByCode('');
    // }
    this.utenteDTO = new UtenteDto();
  }

  aggiornaUtente() {
    this.utenteDTO.inputValidate(this.utenteDTO);
    if (this.utenteDTO.codiceUtenteError || this.utenteDTO.nomeError || this.utenteDTO.cognomeError || this.utenteDTO.dataNascitaError || this.utenteDTO.codiceFiscaleError || this.utenteDTO.livelloPermessiError) {
      console.log('Errore di validazione dei campi');
      return;
    }
    this.Service.aggiornaUtente(this.utenteDTO);
  }

  VaiAHome() {
    this.router.navigate(['/home']);

  }
}
