import { Data } from "@angular/router";
import { AuthService } from "../core/services/AuthService";
import { Service } from "../core/services/service";
import { CameraDto } from "./cameraDTO";
import { ChangeDetectorRef } from "@angular/core";

export class PrenotazioneDTO {
    codicePrenotazione!: string;
    codicePrenotazioneError!: boolean | string;

    dataPrenotazione!: Date | null;
    dataPrenotazioneError!: boolean | string;

    dataInizio!: Date | null;
    dataInizioError!: boolean | string;

    dataFine!: Date | null;
    dataFineError!: boolean | string;

    codiceUtente!: string | null;
    codiceUtenteError!: boolean | string;

    codiceCamera!: string;
    codiceCameraError!: boolean | string;

    costoComplessivo!: number;
    costoComplessivoError!: boolean | string;

    constructor() { }

    // vanno sostituiti poi tutti i messaggi d'errore con l'acquisizione dell'errore da backend
    inputValidate() {
        this.dataPrenotazioneError = false;
        this.dataInizioError = false;
        this.dataFineError = false;

        this.dataPrenotazioneValidate();
        this.dataInizioValidate();
        this.dataFineValidate();
    }

    dataPrenotazioneValidate() {
        if (this.dataPrenotazione === null || this.dataPrenotazione < new Date()) {
            this.dataPrenotazioneError = 'Data prenotazione non valida';
        } else {
            this.dataPrenotazioneError = false;
        }
    }

    dataInizioValidate() {
        if (!this.dataPrenotazione) {
            this.dataFineError = 'Data prenotazione non valida';
        } else if (!this.dataInizio || this.dataInizio < this.dataPrenotazione) {
            this.dataInizioError = 'Data inizio non valida';
        } else if (this.dataFine) {
            if (this.dataInizio > this.dataFine) {
                this.dataInizioError = 'l\'inizio della prenotazione non può essere dopo la fine';
            }
        } else {
            this.dataInizioError = false;
        }
    }

    dataFineValidate() {
        if (this.dataFine === null) {
            this.dataFineError = 'Data fine non valida';
        } else if (this.dataInizio) {
            if (this.dataFine < this.dataInizio) {
                this.dataFineError = 'il termine della prenotazione non può essere prima dell\'inizio'
            }
        } else {
            this.dataFineError = false;
        }
    }


}


