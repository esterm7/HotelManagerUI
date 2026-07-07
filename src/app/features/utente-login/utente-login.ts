import { Component } from '@angular/core';
import { UtenteDto } from '../../DTO/utenteDTO';
import {Router}  from '@angular/router';
import {Service} from '../../services/service';
import { AuthDto } from '../../DTO/authDTO';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-utente-login',
  imports: [FormsModule],
  templateUrl: './utente-login.html',
  styleUrl: './utente-login.css',
})
export class UtenteLogin {

    authDTO!: AuthDto;

    constructor(private router: Router, private service: Service) {
    this.authDTO = new AuthDto();
  }

  autenticazioneUtente() {

    this.service.verificaUtente(this.authDTO).subscribe({
      next: (response) => {
        console.log('Login effettuato:', response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Errore login:', err);
        alert('Credenziali errate!');
      }
    });
  }
}


