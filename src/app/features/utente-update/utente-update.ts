import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtenteDto } from '../../DTO/utenteDTO';
import { Service } from '../../core/services/service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';
import { Location } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FormError } from '../form-error/form-error';
import { FormLayout } from '../form-layout/form-layout';
import { NavLayout } from "../../nav-layout/nav-layout";

@Component({
  selector: 'app-utente-update',
  imports: [FormsModule, NgbPopoverModule, FormError, FormLayout, NavLayout],
  templateUrl: './utente-update.html',
  styleUrl: './utente-update.css',
})
export class UtenteUpdate implements OnInit {

  adulto = new Date().toISOString().split('T')[0];


  utenteDTO!: UtenteDto;

  password!: string;
  passwordError!: boolean | string;
  confermaPassword!: string;
  confermaPasswordError!: boolean | string;

  constructor(private router: Router, private utenteService: Service, private route: ActivatedRoute, public auth: AuthService, private cdr: ChangeDetectorRef, private location: Location) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    this.adulto = date.toISOString().split('T')[0];
  }

  ngOnInit() {
    const codice = this.route.snapshot.params['codiceUtente'];
    this.utenteService.getUtenteByCode(codice).subscribe({
      next: (response) => {
        this.utenteDTO = Object.assign(new UtenteDto(), response);
        console.log('Utente caricato:', this.utenteDTO);
        // console.log(this.auth.currentUser + '\n' +this.auth.getLivelloPermesso())
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
        console.error('Errore: ', err.error);
      }
    });
  };

  updateUtente() {
    this.utenteDTO.inputValidate();
    this.verificaPassword()
    if (this.utenteDTO.nomeError || this.utenteDTO.cognomeError || this.utenteDTO.dataNascitaError || this.utenteDTO.codiceFiscaleError || this.passwordError || this.confermaPasswordError || this.utenteDTO.livelloPermessoError) {
      console.log('Errore di validazione dei campi');
      alert('Ci sono errori sui valori inseriti')
      return;
    }
    this.utenteDTO.password = this.password;
    console.log(this.utenteDTO);
    this.utenteService.aggiornaUtente(this.utenteDTO).subscribe({
      next: (response) => {
        console.log(response);
        alert('Utente aggiornato con successo!');
        this.VaiAPaginaPrecedente();
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

  VaiAPaginaPrecedente() {
    this.location.back();
  }

  verificaPassword() {
    this.passwordError = this.utenteDTO.passwordValidate(this.password);
    if (this.password !== this.confermaPassword) {
      this.confermaPasswordError = 'Le password non coincidono';
    } else this.confermaPasswordError = false
  }

}

