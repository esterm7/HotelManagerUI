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


export class UtenteCreate {

  utenteDTO!: UtenteDto;

  constructor(private router: Router, private utenteService: UtenteService) {
    this.utenteDTO = new UtenteDto();
  }

  salvaUtente() {
    this.utenteService.salva(this.utenteDTO);
    console.log('nome:', this.utenteDTO.nome)
  }

  VaiAHome() {
    this.router.navigate(['/home']);
  }

}
