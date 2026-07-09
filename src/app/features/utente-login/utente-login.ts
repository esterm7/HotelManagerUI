import { Component } from '@angular/core';
import {Router}  from '@angular/router';
import {Service} from '../../core/services/service';
import { AuthDto } from '../../DTO/authDTO';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';


@Component({
  selector: 'app-utente-login',
  imports: [FormsModule],
  templateUrl: './utente-login.html',
  styleUrl: './utente-login.css',
})
export class UtenteLogin {

    authDTO!: AuthDto;

    constructor(private router: Router, private service: Service, private AuthService: AuthService) {
    this.authDTO = new AuthDto();
  }

  autenticazioneUtente() {
    console.log(this.authDTO)
    this.AuthService.login(this.authDTO).subscribe({
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


