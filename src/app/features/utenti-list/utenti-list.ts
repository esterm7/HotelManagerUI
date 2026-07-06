import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { UtenteDto } from '../../DTO/utenteDTO';

@Component({
  selector: 'app-utenti-list',
  imports: [CommonModule],
  templateUrl: './utenti-list.html',
  styleUrl: './utenti-list.css',
})
export class UtentiList {
  utenti: UtenteDto[] = [];
  constructor(private router: Router, private route: ActivatedRoute) { }
  
  
  ngOnInit() {
    this.utenti = this.route.snapshot.data['utenti']; 
  }

    VaiAHome() {
    this.router.navigate(['/home']);
  }

   vaiUpdateUtente(utente: UtenteDto) {
      this.router.navigate(['/utente-update', utente.codiceUtente]);
    }

  permissionLabels: Record<number, string> = {
  1: 'Utente',
  2: 'Gestore',
  3: 'Admin'
  };

}
