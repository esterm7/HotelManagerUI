import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CameraDto } from '../../DTO/cameraDTO';



@Component({
  selector: 'app-camere-list',
  imports: [CommonModule],
  templateUrl: './camere-list.html',
  styleUrl: './camere-list.css',
})


export class CamereList implements OnInit {


     camere: CameraDto[] = [];
  constructor(private router: Router, private route: ActivatedRoute) { }

 ngOnInit() {
    this.camere = this.route.snapshot.data['camere']; 
    console.log('Camere:', this.camere); 
  }


  vaiAllUpdateCamera(camera: CameraDto) {
    this.router.navigate(['/camera-update', camera.codiceCamera]);
  }



  VaiAHome() {
  this.router.navigate(['/home']);
}

}
