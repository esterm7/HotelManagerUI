import { Component } from '@angular/core';
import { CameraDto } from '../../DTO/cameraDTO';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Service } from '../../services/service';




@Component({
  selector: 'app-camera-create',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './camera-create.html',
  styleUrl: './camera-create.css',
})


export class CameraCreate {

  cameraDTO!: CameraDto;

  //fare i controlli di validazione dei campi,
  // se non sono validi non fare il submit del form, altrimenti fare il submit 
  // e stampare in console i dati della camera da salvare

  constructor (private router: Router, private cameraService: Service) {
    this.cameraDTO = new CameraDto();
  }

  
  salvaCamera() {
    console.log (this.cameraDTO);
    this.cameraDTO.inputValidate(this.cameraDTO);
    if (this.cameraDTO.postiLettoError || this.cameraDTO.tipologiaError || this.cameraDTO.tariffaError) {
      console.log('Errore di validazione dei campi');   
      return;
    }
    this.cameraDTO.creaCodiceCamera();
    this.cameraService.salvaCamera(this.cameraDTO);
   // this.router.navigate(['/camera-create']);
  }

  resetForm() {
    this.cameraDTO = new CameraDto();
  }

   VaiAHome() {
    this.router.navigate(['/home']);
  }

  creaCodiceCamera() {
    this.cameraDTO.creaCodiceCamera();

}

}



//creare dto, creare costruttore che istantzia il dto (cel componente es camera-create), 
