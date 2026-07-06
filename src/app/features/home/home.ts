import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CameraDto } from '../../DTO/cameraDTO';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {
   camere: CameraDto[] = [];
  constructor(private router: Router, private route: ActivatedRoute) { }

  
  ngOnInit() {
    this.camere = this.route.snapshot.data['camere']; 
    console.log('Camere:', this.camere); 
  }

  vaiAlCreaUtente() {
    this.router.navigate(['/utente-create']);
  }



  vaiAlCreaCamera() {
    this.router.navigate (['/camera-create']);
  }

  vaiAllUpdateCamera(camera: CameraDto) {
    this.router.navigate(['camera-update', camera.codiceCamera]);
  }

}
