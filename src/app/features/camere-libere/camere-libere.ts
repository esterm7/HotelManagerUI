import { Component, inject, input, output, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../../core/services/service';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../core/services/AuthService';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CameraDto } from '../../DTO/cameraDTO';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';

export interface CamereLibereData {
  prenotazioneTemp: PrenotazioneDTO;
}

@Component({
  selector: 'app-camere-libere',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './camere-libere.html',
  styleUrl: './camere-libere.css',
})
export class CamereLibere implements OnInit {

 private dialogRef = inject(DialogRef<CameraDto | null>);
  private data = inject<CamereLibereData>(DIALOG_DATA);

 camereLibere = signal<CameraDto[]>([]);

  constructor(private router: Router, private route: ActivatedRoute, private service: Service, public auth: AuthService) { }

  ngOnInit() {
    console.log(this.data.prenotazioneTemp)
    this.service.getAllCamereLibere(this.data.prenotazioneTemp).subscribe({
      next: (response) => {
        console.log(response);
        this.camereLibere.set(response);
        
      },
      error: (err) => {
        console.error('Errore: ', err);
      }
    })
    console.log('Camere:', this.camereLibere());
  }

  selezionaCamera(camera: CameraDto) {
    // this.data.prenotazioneTemp.codiceCamera = camera.codiceCamera;
    this.dialogRef.close(camera);
  }

  Annulla() {
    this.dialogRef.close(null);
  }



}
