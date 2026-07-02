import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtenteDto } from '../DTO/utenteDTO';
import { CameraDto } from '../DTO/cameraDTO';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Service {

  private baseUrlUtente = '/api/utente';
  private baseUrlCamera = '/api/camera';

  constructor(private http: HttpClient) {}

  salvaUtente(dto: UtenteDto): Observable<string> {
  return this.http.post(this.baseUrlUtente, dto, {
    responseType: 'text'
  });
}
  
  getUtenteByCode(code: string) {
    return this.http.get(`${this.baseUrlUtente}/${code}`);
  }
   
  aggiornaUtente(dto: UtenteDto) {
    return this.http.put(this.baseUrlUtente, dto);
  }
  

  salvaCamera(dto: CameraDto) {
    return this.http.post(this.baseUrlCamera, dto);
    
  } 

  getCameraByCode(code: string) {
    return this.http.get(`${this.baseUrlCamera}/${code}`);
  }
  
}


