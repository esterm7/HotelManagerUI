import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtenteDTO } from '../DTO/utenteDTO';
import { CameraDto } from '../DTO/cameraDTO';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Service {

  private baseUrlUtente = '/api/utente';
  private baseUrlCamera = '/api/camera';

  constructor(private http: HttpClient) { }

<<<<<<< HEAD
  salvaUtente(dto: UtenteDto): Observable<string> {
  return this.http.post(this.baseUrlUtente, dto, {
    responseType: 'text'
  });
}

   getAllCamere() {
  return this.http.get<CameraDto[]>(`${this.baseUrlCamera}/all`);
}
  
aggiornaCamera(dto: CameraDto) {
  return this.http.put(this.baseUrlCamera, dto);
}

  getUtenteByCode(code: string) {
    return this.http.get(`${this.baseUrlUtente}/${code}`);
  }
   
  aggiornaUtente(dto: UtenteDto) {
    return this.http.put(this.baseUrlUtente, dto);
  }
  

  salvaCamera(dto: CameraDto): Observable <String> {
=======
  salvaCamera(dto: CameraDto): Observable<String> {
>>>>>>> b384282214b0db09944d935150014c3e3f8d3e1c
    return this.http.post(this.baseUrlCamera, dto, {
      responseType: 'text'
    });
  }

  getCameraByCode(code: string) {
    return this.http.get(`${this.baseUrlCamera}/${code}`);
  }

  getAllCamere() {
    return this.http.get<CameraDto[]>(`${this.baseUrlCamera}/all`);
  }

  salvaUtente(dto: UtenteDTO): Observable<string> {
    return this.http.post(this.baseUrlUtente, dto, {
      responseType: 'text'
    });
  }

  getUtenteByCode(code: string) {
    return this.http.get(`${this.baseUrlUtente}/${code}`);
  }

  getAllUtenti() {
    return this.http.get<UtenteDTO[]>(`${this.baseUrlUtente}/all`);
  }

  aggiornaUtente(dto: UtenteDTO) {
    return this.http.put(this.baseUrlUtente, dto);
  }

}


