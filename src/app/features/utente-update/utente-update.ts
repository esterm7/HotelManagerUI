import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtenteDto } from '../../DTO/utenteDTO';
import { Service } from '../../core/services/service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';
import { Location } from '@angular/common';

@Component({
  selector: 'app-utente-update',
  imports: [FormsModule],
  templateUrl: './utente-update.html',
  styleUrl: './utente-update.css',
})
export class UtenteUpdate implements OnInit {

  dropdownOpen = signal(false);

  utenteDTO!: UtenteDto;

  password!: string;
  passwordError!: boolean | string;
  confermaPassword!: string;
  confermaPasswordError!: boolean | string;

  constructor(private router: Router, private utenteService: Service, private route: ActivatedRoute, public auth: AuthService, private cdr: ChangeDetectorRef, private location: Location) {
  }

  ngOnInit() {
    const codice = this.route.snapshot.params['codiceUtente'];
    this.utenteService.getUtenteByCode(codice).subscribe({
      next: (response) => {
        this.utenteDTO = Object.assign(new UtenteDto(), response);
        console.log('Utente caricato:', this.utenteDTO);
        // console.log(this.auth.currentUser + '\n' +this.auth.getLivelloPermessi())
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
    if (this.utenteDTO.nomeError || this.utenteDTO.cognomeError || this.utenteDTO.dataNascitaError || this.utenteDTO.codiceFiscaleError || this.passwordError || this.confermaPasswordError || this.utenteDTO.livelloPermessiError) {
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

  verificaPassword(){
    this.passwordError = this.utenteDTO.passwordValidate(this.password);
    if(this.password !== this.confermaPassword){
      this.confermaPasswordError = 'Le password non coincidono';
    } else this.confermaPasswordError = false
  }

openDropdown() {
    this.dropdownOpen.set(true);
    // console.log(this.auth.currentUser() + '\n'+ this.auth.getLivelloPermessi());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }

  get isAdmin(){
    return this.auth.isAdmin();
  }

  get isGestore() {
    return this.auth.isGestore();
  }

  get isUtente() {
    return this.auth.isUtente();
  }
}

