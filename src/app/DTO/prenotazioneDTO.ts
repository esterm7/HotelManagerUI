import { Data } from "@angular/router";

export class PrenotazioneDTO {
    codicePrenotazione!: string;
    codicePrenotazioneError!: boolean | string;

    dataPrenotazione!: Date;
    dataPrenotazioneError!: boolean | string;

    dataInizio!: Date;
    dataInizioError!: boolean | string;

    dataFine!: Date;
    dataFineError!: boolean | string;

    codiceUtente!: string;
    codiceUtenteError!: boolean | string;

    codiceCamera!: string;
    codiceCameraError!: boolean | string;

    costoComplessivo!: number;
    costoComplessivoError!: boolean | string;

    constructor() { }

    // vanno sostituiti poi tutti i messaggi d'errore con l'acquisizione dell'errore da backend
    inputValidate() {
        //gestione data
        //    this.dataNascita = new Date(utenteDTO.dataNascita);
        // reset errors
        this.dataPrenotazioneError = false;
        this.dataInizioError = false;
        this.dataFineError = false;
        this.codiceUtenteError = false;
        this.codiceCameraError = false;
        this.costoComplessivoError = false;

        this.dataPrenotazioneValidate();
        this.dataInizioValidate();
        this.dataFineValidate();
    }

    dataPrenotazioneValidate() {
        if (this.dataPrenotazione < new Date()) {
            this.dataPrenotazioneError = 'Data prenotazione non valida';
        } else {
            this.dataPrenotazioneError = false;
        }
    }

    dataInizioValidate() {
        if (this.dataInizio < this.dataPrenotazione) {
            this.dataInizioError = 'Data inizio non valida';
        } else {
            this.dataInizioError = false;
        }
    }

    dataFineValidate() {
        if (this.dataFine < this.dataInizio) {
            this.dataFineError = 'Data fine non valida';
        } else {
            this.dataFineError = false;
        }
    }

}