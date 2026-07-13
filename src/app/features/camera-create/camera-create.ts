import { Component } from '@angular/core';
import { CameraDto } from '../../DTO/cameraDTO';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Service } from '../../core/services/service';
import { error } from 'console';




@Component({
  selector: 'app-camera-create',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './camera-create.html',
  styleUrl: './camera-create.css',
})


export class CameraCreate {

  cameraDTO!: CameraDto;

  constructor (private router: Router, private cameraService: Service) {
    this.cameraDTO = new CameraDto();
  }


  salvaCamera() {
    console.log (this.cameraDTO);
    this.cameraDTO.validazioneInput();
    if (this.cameraDTO.postiLettoError || this.cameraDTO.tipologiaError || this.cameraDTO.tariffaError) {
      console.log('Errore di validazione dei campi');   
      return;
    }
    this.cameraService.salvaCamera(this.cameraDTO).subscribe({
      next:response => {
        console.log(response);
        this.cameraDTO.codiceCamera = response as string; 
      alert('Camera salvata con successo!' + '\nCodice camera: ' + response);
       this.VaiAListaCamere();
        },
        error: ()=> {
          console.error('Errore durante l\'inserimento della camera');
        
          },
        });
      };
    

    

  resetForm() {
    this.cameraDTO = new CameraDto();
  }

   VaiAListaCamere() {
    this.router.navigate(['/camere-list']);
  }
}




//creare dto, creare costruttore che istantzia il dto (cel componente es camera-create), 
