import { Component} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CameraDto } from '../../DTO/cameraDTO';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

  constructor(private router: Router, private route: ActivatedRoute) { }

  
 
  vaiAlCreaUtente() {
    this.router.navigate(['/utente-create']);
  }

  vaiAListaCamere() {
    this.router.navigate(['/camere-list'])
  }
  vaiAListaUtenti() {
    this.router.navigate(['/utenti-list'])
  }


  vaiAlCreaCamera() {
    this.router.navigate (['/camera-create']);
  }

  
}
