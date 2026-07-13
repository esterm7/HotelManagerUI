import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtenteDto } from '../../DTO/utenteDTO';
import { CameraDto } from '../../DTO/cameraDTO';
import { Observable } from 'rxjs';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';

@Injectable({ providedIn: 'root' })
export class Service {

  private baseUrlUtente = '/api/utente';
  private baseUrlCamera = '/api/camera';
  private baseUrlPrenotazione = '/api/prenotazione';

  constructor(private http: HttpClient) { }

  salvaCamera(dto: CameraDto): Observable<String> {
    return this.http.post(this.baseUrlCamera, dto, {
      responseType: 'text'
    });
  }

  getCameraByCode(code: string) {
    return this.http.get<CameraDto>(`${this.baseUrlCamera}/${code}`);
  }

  getAllCamere() {
    return this.http.get<CameraDto[]>(`${this.baseUrlCamera}/all`);
  }

  aggiornaCamera(dto: CameraDto) {
    return this.http.put(`${this.baseUrlCamera}/${dto.codiceCamera}`, dto);
  }

  cancellaCamera(codice: String) {
    return this.http.delete(`${this.baseUrlCamera}/${codice}`);
  }

  salvaUtente(dto: UtenteDto): Observable<string> {
    return this.http.post(this.baseUrlUtente, dto, {
      responseType: 'text'
    });
  }

  getUtenteByCode(code: string) {
    return this.http.get<UtenteDto>(`${this.baseUrlUtente}/${code}`);
  }

  getAllUtenti() {
    return this.http.get<UtenteDto[]>(`${this.baseUrlUtente}/all`);
  }

  aggiornaUtente(dto: UtenteDto) {
    return this.http.put(`${this.baseUrlUtente}/${dto.codiceUtente}`, dto);
  }

  deleteUtente(code: string) {
    return this.http.delete(`${this.baseUrlUtente}/${code}`)
  }

  getAllPrenotazioni() {
    return this.http.get<PrenotazioneDTO[]>((`${this.baseUrlPrenotazione}/all`));
  }

  cancellaPrenotazione(codice: String) {
    return this.http.delete(`${this.baseUrlPrenotazione}/${codice}`);
  }

  salvaPrenotazione(dto: PrenotazioneDTO): Observable<string> {
    return this.http.post(this.baseUrlPrenotazione, dto, {
      responseType: 'text'
    });
  }

  getPrenotazioneByCode(code: string) {
    return this.http.get<PrenotazioneDTO>(`${this.baseUrlPrenotazione}/${code}`);
  }

}
