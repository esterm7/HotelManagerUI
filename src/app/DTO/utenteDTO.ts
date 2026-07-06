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
    inputValidate() {
        //gestione data
        //    this.dataNascita = new Date(utenteDTO.dataNascita);
        // reset errors
        this.nomeError = false;
        this.cognomeError = false;
        this.dataNascitaError = false;
        this.codiceFiscaleError = false;
        this.livelloPermessiError = false;

        // this.codiceUtenteValidate();
        this.nomeUtenteValidate();
        this.cognomeUtenteValidate();
        this.dataNascitaUtenteValidate();
        this.codiceFiscaleUtenteValidate('');
        this.livelloPermessiUtenteValidate();
    }

    codiceUtenteValidate() {

        if (!this.codiceUtente || this.codiceUtente.trim() === '' || this.codiceUtente.trim().length > 12) {
            this.codiceUtenteError = 'Codice utente non valido';
        } else if (this.codiceUtenteError = 'esma2026') {
            this.codiceUtenteError = 'Codice già presente';
        } else {
            this.codiceUtenteError = false;
            this.codiceUtente = this.codiceUtente.trim();
        }
    }
    nomeUtenteValidate() {
        if (!this.nome || this.nome.trim() === '' || this.nome.trim().length > 50) {
            this.nomeError = 'Nome non valido';
        } else {
            this.nomeError = false;
            this.nome = this.nome.trim();
        }
    }
    cognomeUtenteValidate() {
        if (!this.cognome || this.cognome.trim() === '' || this.cognome.trim().length > 50) {
            this.cognomeError = 'Cognome non valido';
        } else {
            this.cognomeError = false;
            this.cognome = this.cognome.trim();
        }
    }
    dataNascitaUtenteValidate() {
        if (!this.dataNascita) {
            this.dataNascitaError = 'Data di nascita non valida';
        } else {
            this.dataNascitaError = false;
            this.dataNascita = this.dataNascita;
        }
    }
    codiceFiscaleUtenteValidate(err: string) {
        if (err) {
            this.codiceFiscaleError = err;
        } else if (!this.codiceFiscale || this.codiceFiscale.trim() === '' || this.codiceFiscale.trim().length !== 16 || (!/^[A-Z]{6}\d{2}[ABCDEHLMPRST]\d{2}[A-Z]\d{3}[A-Z]$/.test(this.codiceFiscale.trim().toUpperCase()))) {
            this.codiceFiscaleError = 'Formato codice fiscale non valido';
        } else {
            this.codiceFiscaleError = false;
            this.codiceFiscale = this.codiceFiscale.trim();
        }
    }
    livelloPermessiUtenteValidate() {
        if (this.livelloPermessi == null || isNaN(Number(this.livelloPermessi))) {
            this.livelloPermessiError = true;
        } else {
            this.livelloPermessiError = false;
            this.livelloPermessi = Number(this.livelloPermessi);
        }
    }
}