import { Component } from '@angular/core';
import { CameraDto } from '../../DTO/cameraDTO';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../../services/service';

//deve prendere il codice della stanza 
@Component({
  selector: 'app-camera-update',
  standalone: true, 
  imports: [FormsModule],
  templateUrl: './camera-update.html',
  styleUrl: './camera-update.css',
})


export class CameraUpdate {
    
    cameraDTO!: CameraDto;
  
    constructor(private router: Router, private cameraService: Service) {
      const Camera : CameraDto = this.cameraDTO;
      }


    updateCamera() {
      if (this.cameraDTO.codiceCamera) {
        this.cameraService.getCameraByCode(this.cameraDTO.codiceCamera).subscribe({
          next: (response) => {
            this.cameraDTO = response as CameraDto;
            console.log('Camera trovata:', this.cameraDTO);
            alert("Modifiche apportate con successo!");
            this.VaiAHome();
          }
        });
      }
    }

  

 resetForm() {
this.cameraDTO = new CameraDto();
}

   VaiAHome() {
  this.router.navigate(['/home']);
 }

    }
