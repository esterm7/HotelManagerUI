import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CameraDto } from '../../DTO/cameraDTO';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../../core/services/service';
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../core/services/AuthService';
import { Location } from '@angular/common';
import { TipoCamera } from '../../core/enums/tipologia-camera-enum';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';



//deve prendere il codice della stanza 
@Component({
  selector: 'app-camera-update',
  imports: [FormsModule,NgbPopoverModule ],
  templateUrl: './camera-update.html',
  styleUrl: './camera-update.css',
})


export class CameraUpdate implements OnInit {

  cameraDTO!: CameraDto;

  tipologie = Object.values(TipoCamera);

  
  constructor(private router: Router, private cameraService: Service, private route: ActivatedRoute, public auth: AuthService, private cdr: ChangeDetectorRef, private location: Location) {
  }

  ngOnInit() {
    const codice = this.route.snapshot.params['codiceCamera'];
    this.cameraService.getCameraByCode(codice).subscribe({
      next: (response) => {
        this.cameraDTO = Object.assign(new CameraDto(), response);
        // console.log(response);
        console.log('Camera caricata:', this.cameraDTO);
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error('Errore: ', err);
      }
    });

  }

  updateCamera() {
    this.cameraDTO.validazioneInput();
    if (this.cameraDTO.postiLettoError || this.cameraDTO.tipologiaError || this.cameraDTO.tariffaError) {
      console.log('Errore di validazione dei campi');
      return;
    }
    console.log(this.cameraDTO);

    this.cameraService.aggiornaCamera(this.cameraDTO).subscribe({
      next: (response) => {
        console.log(response);
        alert("Modifiche apportate con successo!");
        this.VaiAPaginaPrecedente();
      },
    });
  }

  vaiAListaCamere() {
    this.router.navigate(['/camere-list'])
  }

  VaiAHome() {
    this.router.navigate(['/home']);
  }

  VaiAPaginaPrecedente() {
    this.location.back();
  }

}
