import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/AuthService';
import { Service } from '../../core/services/service';
import { NavLayout } from '../../nav-layout/nav-layout';


@Component({
  selector: 'app-home',
  imports: [CommonModule, NavLayout],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute, public auth: AuthService, private service: Service) { }


  livelloPermesso!: string | null;


  vaiAlCreaUtente() {
    this.router.navigate(['/utente-create']);
  };

  vaiAListaCamere() {
    this.router.navigate(['/camere-list'])
  };

  vaiAListaUtenti() {
    this.router.navigate(['/utenti-list'])
  };

  vaiAListaPrenotazioni() {
    this.router.navigate(['/prenotazioni-list']);
  }

  vaiAlCreaPrenotazione() {
    this.router.navigate(['prenotazione-create']);
  }

  vaiAlCreaCamera() {
    this.router.navigate(['/camera-create']);
  };

  vaiUpdateUtente() {
    this.router.navigate(['/utente-update', this.auth.getCodiceUtente()]);
  };

  ngOnInit(): void {
    this.livelloPermesso = this.auth.getLivelloPermesso();
  }

}