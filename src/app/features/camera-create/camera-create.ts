import { Component, OnInit, signal } from '@angular/core';
import { CameraDto } from '../../DTO/cameraDTO';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Service } from '../../core/services/service';
import { AuthService } from '../../core/services/AuthService';
import { TipoCamera } from '../../core/enums/tipologia-camera-enum';
import { Location } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';






@Component({
  selector: 'app-camera-create',
  standalone: true,
  imports: [FormsModule, NgbPopoverModule],
  templateUrl: './camera-create.html',
  styleUrl: './camera-create.css',
})


export class CameraCreate implements OnInit {

  dropdownOpen = signal(false);

  cameraDTO!: CameraDto;

  livelloPermesso!: string | null;

  tipologie = Object.values(TipoCamera);

  tipologiaSelezionata: TipoCamera | null = null;

  constructor(private router: Router, private cameraService: Service, public auth: AuthService, private location: Location) {
    this.cameraDTO = new CameraDto();
  }

  openDropdown() {
    this.dropdownOpen.set(true);
    // console.log(this.auth.currentUser() + '\n'+ this.auth.getLivelloPermesso());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }



  salvaCamera() {
    console.log(this.cameraDTO);
    this.cameraDTO.validazioneInput();
    if (this.cameraDTO.postiLettoError || this.cameraDTO.tipologiaError || this.cameraDTO.tariffaError) {
      console.log('Errore di validazione dei campi');
      return;
    }
    this.cameraService.salvaCamera(this.cameraDTO).subscribe({
      next: response => {
        console.log(response);
        this.cameraDTO.codiceCamera = response as string;
        alert('Camera salvata con successo!' + '\nCodice camera: ' + response);
        this.VaiAListaCamere();
      },
      error: () => {
        console.error('Errore durante l\'inserimento della camera');

      },
    });
  };


  resetForm() {
    this.cameraDTO = new CameraDto();
  }

  VaiAPaginaPrecedente() {
    this.location.back();
  }

  VaiAHome() {
    this.router.navigate(['/home']);
  }

  VaiAListaCamere() {
    this.router.navigate(['/camere-list']);
  }

  ngOnInit(): void {
    this.livelloPermesso = this.auth.getLivelloPermesso();
  }

}