import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CameraDto } from '../../DTO/cameraDTO';
import { Service } from '../../core/services/service';

@Component({
  selector: 'app-camere-list',
  imports: [CommonModule],
  templateUrl: './camere-list.html',
  styleUrl: './camere-list.css',
})




export class CamereList implements OnInit {


  camere: CameraDto[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private service: Service) { }

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

  deleteCamera(camera: CameraDto) {

    if (confirm(`Sei sicuro di voler eliminare la camera ${camera.codiceCamera} ? `)) {
      this.service.cancellaCamera(camera.codiceCamera).subscribe({
        next: (response) => {
          console.log(response);
          alert("Camera eliminata");
          window.location.reload();
        }
      });
    }
  }

 vaiAlCreaCamera() {
    this.router.navigate(['/camera-create']);
  };
}
