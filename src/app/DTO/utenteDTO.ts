export class UtenteDto {
    codiceUtente!: string | null;
    codiceUtenteError!: boolean | string;

    nome!: string;
    nomeError!: boolean | string;

    cognome!: string;
    cognomeError!: boolean | string;

    dataNascita!: string;
    dataNascitaError!: boolean | string;

    codiceFiscale!: string;
    codiceFiscaleError!: boolean | string;

    livelloPermessi!: number;
    livelloPermessiError!: boolean | string;

    constructor() {
    }

    // vanno sostituiti poi tutti i messaggi d'errore con l'acquisizione dell'errore da backend
    inputValidate(utenteDTO: UtenteDto) {
        //gestione data
        //    this.dataNascita = new Date(utenteDTO.dataNascita);
        // reset errors
        this.nomeError = false;
        this.cognomeError = false;
        this.dataNascitaError = false;
        this.codiceFiscaleError = false;
        this.livelloPermessiError = false;

        this.codiceUtenteValidate();
        this.nomeUtenteValidate();
        this.cognomeUtenteValidate();
        this.dataNascitaUtenteValidate();
        this.codiceFiscaleUtenteValidate();
        this.livelloPermessiUtenteValidate();
    }

    codiceUtenteValidate() {
        this.codiceUtenteError = false;

        if (!this.codiceUtente || this.codiceUtente.trim() === '' || this.codiceUtente.trim().length > 12) {
            this.codiceUtenteError = 'Codice utente non valido';
        } else if (this.codiceUtenteError = 'esma2026') {
            this.codiceUtenteError = 'Codice già presente';
        } else {
            this.codiceUtente = this.codiceUtente.trim();
        }
    }
    nomeUtenteValidate() {
        this.nomeError = false;
        if (!this.nome || this.nome.trim() === '' || this.nome.trim().length > 50) {
            this.nomeError = 'Nome non valido';
        } else {
            this.nome = this.nome.trim();
        }
    }
    cognomeUtenteValidate() {
        this.cognomeError = false;
        if (!this.cognome || this.cognome.trim() === '' || this.cognome.trim().length > 50) {
            this.cognomeError = 'Cognome non valido';
        } else {
            this.cognome = this.cognome.trim();
        }
    }
    dataNascitaUtenteValidate() {
        this.dataNascitaError = false;
        if (!this.dataNascita) {
            this.dataNascitaError = 'Data di nascita non valida';
        } else {
            this.dataNascita = this.dataNascita;
        }
    }
    codiceFiscaleUtenteValidate() {
        this.codiceFiscaleError = false;
        if (!this.codiceFiscale || this.codiceFiscale.trim() === '' || this.codiceFiscale.trim().length !== 16) {
            this.codiceFiscaleError = 'Codice fiscale non valido';
        } else if (String(this.codiceFiscale) === "1234567890123456") {
            this.codiceFiscaleError = 'Codice già presente';
        } else {
            this.codiceFiscale = this.codiceFiscale.trim();
        }
    }
    livelloPermessiUtenteValidate() {
        this.livelloPermessiError = false;
        if (this.livelloPermessi == null || isNaN(Number(this.livelloPermessi))) {
            this.livelloPermessiError = true;
        } else {
            this.livelloPermessi = Number(this.livelloPermessi);
        }
    }
}