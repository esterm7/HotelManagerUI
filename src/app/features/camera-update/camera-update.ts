import { Component, OnInit } from '@angular/core';
import { CameraDto } from '../../DTO/cameraDTO';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../../services/service';
import { ActivatedRoute } from '@angular/router'

//deve prendere il codice della stanza 
@Component({
  selector: 'app-camera-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './camera-update.html',
  styleUrl: './camera-update.css',
})


export class CameraUpdate implements OnInit {

 cameraDTO!: CameraDto;

  constructor(private router: Router, private cameraService: Service, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const codice = this.route.snapshot.params['codiceCamera'];
    this.cameraService.getCameraByCode(codice).subscribe({
      next: (response) => {
        console.log(response);
        this.cameraDTO = response as CameraDto;
        console.log('Camera caricata:', this.cameraDTO);
      },
      error: (err) => {
        console.error('Errore: ', err);
      }
    });

  }

  updateCamera() {

        const codice = this.route.snapshot.params['codiceCamera'];
    this.cameraService.aggiornaCamera(codice, this.cameraDTO).subscribe({
      next: () => {
        console.log('Camera aggiornata:', this.cameraDTO);
        alert("Modifiche apportate con successo!");
        this.VaiAHome();
      },
    });
  }




VaiAHome() {
  this.router.navigate(['/home']);
}

    }
