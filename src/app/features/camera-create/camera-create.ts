import { Component } from '@angular/core';
import { cameraDTO } from '../../DTO/cameraDTO';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-camera-create',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './camera-create.html',
  styleUrl: './camera-create.css',
})
export class CameraCreate {

  camera: cameraDTO;

  //fare i controlli di validazione dei campi,
  // se non sono validi non fare il submit del form, altrimenti fare il submit 
  // e stampare in console i dati della camera da salvare

  constructor (private router: Router) {
    this.camera = new cameraDTO();
  }

  
  submitForm() {
    console.log ('Camera da salvare:', this.camera);
    this.router.navigate(['/camera-create']);
  }

  resetForm() {
    this.camera = new cameraDTO();
  }
}



//creare dto, creare costruttore che istantzia il dto (cel componente es camera-create), 
