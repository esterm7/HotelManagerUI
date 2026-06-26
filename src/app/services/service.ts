import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtenteDto } from '../DTO/utenteDTO';
import { CameraDto } from '../DTO/cameraDTO';

@Injectable({ providedIn: 'root' })
export class Service {

  private baseUrlUtente = '/utente';
  private baseUrlCamera = '/camera';

  constructor(private http: HttpClient) {}

  salvaUtente(dto: UtenteDto) {
    return this.http.post(this.baseUrlUtente, dto);
  }

  salvaCamera(dto: CameraDto) {
    return this.http.post(this.baseUrlCamera, dto);
    
  } 
  }


