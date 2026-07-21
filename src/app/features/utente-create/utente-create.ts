import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UtenteDto } from '../../DTO/utenteDTO';
import { FormsModule } from '@angular/forms';
import { Service } from '../../core/services/service';
import { Location } from '@angular/common';
import { AuthService } from '../../core/services/AuthService';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FormLayout } from '../form-layout/form-layout';
import { FormError } from '../form-error/form-error';
import { LivelloPermesso } from '../../core/enums/livello-permessi';

@Component({
  selector: 'app-utente-create',
  imports: [FormsModule, NgbPopoverModule, FormLayout, FormError],
  templateUrl: './utente-create.html',
  styleUrl: './utente-create.css',
})


//fare i controlli di validazione dei campi,
// se non sono validi non fare il submit del form, altrimenti fare il submit 
// e stampare in console i dati della camera da salvare

export class UtenteCreate implements OnInit {

  adulto = new Date().toISOString().split('T')[0];

  dropdownOpen = signal(false);

  utenteDTO!: UtenteDto;

  livelloPermesso!: string | null;


  openDropdown() {
    this.dropdownOpen.set(true);
    // console.log(this.auth.currentUser() + '\n'+ this.auth.getLivelloPermesso());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }


  ngOnInit(): void {
    this.livelloPermesso = this.auth.getLivelloPermesso();
  }

  confermaPassword!: string;
  confermaPasswordError!: boolean | string;

  constructor(private router: Router, private utenteService: Service, private location: Location, public auth: AuthService) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    this.adulto = date.toISOString().split('T')[0];

    this.utenteDTO = new UtenteDto();
    this.utenteDTO.livelloPermesso = LivelloPermesso.UTENTE; // Imposta il valore predefinito a 3 (Utente) 
  }

  salvaUtente() {
    this.utenteDTO.inputValidate();
    if (this.utenteDTO.nomeError || this.utenteDTO.cognomeError || this.utenteDTO.dataNascitaError || this.utenteDTO.codiceFiscaleError || this.utenteDTO.livelloPermessoError || this.utenteDTO.passwordError || this.confermaPasswordError) {
      console.log('Errore di validazione dei campi');
      return;
    }
    this.utenteService.salvaUtente(this.utenteDTO).subscribe({
      next: (response) => {
        console.log(response);
        this.utenteDTO.codiceUtente = response as string; // Assegna il codice utente restituito dal backend
        alert('Utente salvato con successo! \nCodice utente: ' + this.utenteDTO.codiceUtente);
        this.VaiAPaginaPrecedente();
      },
      error: (err) => {
        console.log(err);
        this.utenteDTO.codiceFiscaleError = err.error;
        alert(err.error);
        console.error('Errore durante il salvataggio dell\'utente: ', err.error);
      },
      complete: () => {
        console.log('Richiesta completata');
      }
    });
  };


  VaiAPaginaPrecedente() {
    this.location.back();
  }

  verificaPassword() {
    if (this.utenteDTO.password && (this.utenteDTO.password !== this.confermaPassword)) {
      this.confermaPasswordError = 'Le password non coincidono';
    } else this.confermaPasswordError = false
  }


  resetForm() {
    this.utenteDTO.nome = '';
    this.utenteDTO.cognome = '';
    this.utenteDTO.dataNascita = null;
    this.utenteDTO.codiceFiscale = '';
    this.utenteDTO.livelloPermesso = LivelloPermesso.UTENTE; // Imposta il valore predefinito a 1 (Utente)
    this.utenteDTO.codiceUtente = '';

    //resetto gli errori
    this.utenteDTO.codiceUtenteError = false;
    this.utenteDTO.nomeError = false;
    this.utenteDTO.cognomeError = false;
    this.utenteDTO.dataNascitaError = false;
    this.utenteDTO.codiceFiscaleError = false;
    this.utenteDTO.livelloPermessoError = false;
  }

}
