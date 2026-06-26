import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtenteDto } from '../DTO/utenteDTO';

@Injectable({ providedIn: 'root' })
export class UtenteService {

  private baseUrl = '/utente';

  constructor(private http: HttpClient) {}

  salva(dto: UtenteDto) {
    return this.http.post(this.baseUrl, dto);
  }
}