import { Component } from '@angular/core';
import { CameraDto } from '../../DTO/cameraDTO';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Service } from '../../services/service';
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

  //fare i controlli di validazione dei campi,
  // se non sono validi non fare il submit del form, altrimenti fare il submit 
  // e stampare in console i dati della camera da salvare

  constructor (private router: Router, private cameraService: Service) {
    this.cameraDTO = new CameraDto();
  }

  
  salvaCamera() {
    console.log (this.cameraDTO);
    this.cameraDTO.validazioneInput(this.cameraDTO);
    if (this.cameraDTO.postiLettoError || this.cameraDTO.tipologiaError || this.cameraDTO.tariffaError) {
      console.log('Errore di validazione dei campi');   
      return;
    }
    this.cameraService.salvaCamera(this.cameraDTO).subscribe({
      next:response => {
        this.cameraDTO.codiceCamera = response as string; 
      alert('Camera salvata con successo!' + '\nCodice camera: ' + this.cameraDTO.codiceCamera);
       this.VaiAHome();
        },
        error: (err) => {
          console.error('Errore durante l\'inserimento della camera', err);
          },
          complete: () => {
            console.log('Richiesta completata');

          }
        });
      };
    
   

  resetForm() {
    this.cameraDTO = new CameraDto();
  }

   VaiAHome() {
    this.router.navigate(['/home']);
  }
}




//creare dto, creare costruttore che istantzia il dto (cel componente es camera-create), 
