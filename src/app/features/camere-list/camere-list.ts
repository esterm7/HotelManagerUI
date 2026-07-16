import { Component, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CameraDto } from '../../DTO/cameraDTO';
import { Service } from '../../core/services/service';
import { AuthService } from '../../core/services/AuthService';


@Component({
  selector: 'app-camere-list',
  imports: [CommonModule],
  templateUrl: './camere-list.html',
  styleUrl: './camere-list.css',
})


export class CamereList implements OnInit {


  dropdownOpen = signal(false);
  livelloPermessi!: string | null;



  camere: CameraDto[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private service: Service, public auth: AuthService) { }

  ngOnInit() {
    this.camere = this.route.snapshot.data['camere'];
    console.log('Camere:', this.camere);
    this.livelloPermessi = this.auth.getLivelloPermessi();
  }

  openDropdown() {
    this.dropdownOpen.set(true);
    // console.log(this.auth.currentUser() + '\n'+ this.auth.getLivelloPermessi());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
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

  get isAdmin() {
    return this.auth.isAdmin();
  }

  get isGestore() {
    return this.auth.isGestore();
  }

  get isUtente() {
    return this.auth.isUtente();
  }

  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}
