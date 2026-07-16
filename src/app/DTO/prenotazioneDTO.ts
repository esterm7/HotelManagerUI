import { TipoCamera } from '../core/enums/tipologia-camera-enum';

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

    codiceCamera!: string | null;
    codiceCameraError!: boolean | string;

    costoComplessivo!: number;
    costoComplessivoError!: boolean | string;

    tipologiaCamera!: TipoCamera | null;
    tipologiaCameraError!: boolean | string;

    constructor() { }

    // vanno sostituiti poi tutti i messaggi d'errore con l'acquisizione dell'errore da backend
    inputValidate() {
        this.dataPrenotazioneError = false;
        this.dataInizioError = false;
        this.dataFineError = false;
        this.tipologiaCameraError = false

        this.dataPrenotazioneValidate();
        this.dataInizioValidate();
        this.dataFineValidate();
        this.tipologiaCameraValidate();
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
        } else if (this.dataFine && this.dataInizio > this.dataFine) {
            this.dataInizioError = 'l\'inizio della prenotazione non può essere dopo la fine';
        } else {
            this.dataInizioError = false;
        }
    }

    dataFineValidate() {
        if (!this.dataFine) {
            this.dataFineError = 'Data fine non valida';
        } else if (this.dataInizio && this.dataFine < this.dataInizio) {
            this.dataFineError = 'il termine della prenotazione non può essere prima dell\'inizio'
        } else {
            this.dataFineError = false;
        }
    }

    tipologiaCameraValidate() {
        if (!this.tipologiaCamera) {
            this.tipologiaCameraError = 'Tipologia camera non valida';
        } else {
            this.tipologiaCameraError = false;
        }
    }

}


