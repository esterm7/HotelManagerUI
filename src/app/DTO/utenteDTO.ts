export class UtenteDto {
    codiceUtente!: string;
    codiceUtenteError!: boolean;

    nome!: string;
    nomeError!: boolean;

    cognome!: string;
    cognomeError!: boolean;

    dataNascita!: Date;
    dataNascitaError!: boolean;

    codiceFiscale!: string;
    codiceFiscaleError!: boolean;

    livelloPermessi!: number;
    livelloPermessiError!: boolean;

    constructor() {
    }

    inputValidate(utenteDTO: UtenteDto) {
        //gestione data
    //    this.dataNascita = new Date(utenteDTO.dataNascita);
        // reset errors
        this.codiceUtenteError = false;
        this.nomeError = false;
        this.cognomeError = false;
        this.dataNascitaError = false;
        this.codiceFiscaleError = false;
        this.livelloPermessiError = false;

        // valida codiceUtente
        if (!utenteDTO.codiceUtente || utenteDTO.codiceUtente.trim() === '' || utenteDTO.codiceUtente.trim().length > 12) {
            this.codiceUtenteError = true;
        } else {
            this.codiceUtente = utenteDTO.codiceUtente.trim();
        }

        // valida nome
        if (!utenteDTO.nome || utenteDTO.nome.trim() === '' || utenteDTO.nome.trim().length > 50) {
            this.nomeError = true;
        } else {
            this.nome = utenteDTO.nome.trim();
        }

        // valida cognome
        if (!utenteDTO.cognome || utenteDTO.cognome.trim() === '' || utenteDTO.cognome.trim().length > 50) {
            this.cognomeError = true;
        } else {
            this.cognome = utenteDTO.cognome.trim();
        }

        // valida dataNascita
        if (!utenteDTO.dataNascita || !(utenteDTO.dataNascita instanceof Date)) {
            this.dataNascitaError = true;
        } else {
            this.dataNascita = utenteDTO.dataNascita;
        }

        // valida codiceFiscale
        if (!utenteDTO.codiceFiscale || utenteDTO.codiceFiscale.trim() === '' || utenteDTO.codiceFiscale.trim().length !== 16) {
            this.codiceFiscaleError = true;
        } else {
            this.codiceFiscale = utenteDTO.codiceFiscale.trim();
        }

        // valida livelloPermessi
        if (utenteDTO.livelloPermessi == null || isNaN(Number(utenteDTO.livelloPermessi))) {
            this.livelloPermessiError = true;
        } else {
            this.livelloPermessi = Number(utenteDTO.livelloPermessi);
        }
    }

    creaCodiceUtente() {
        const nome = this.nome.trim().toLowerCase();
        const cognome = this.cognome.trim().toLowerCase();
        const dataNascita = this.dataNascita;
        this.codiceUtente = `${nome.charAt(0)}${cognome}${dataNascita.getFullYear()}`.toLowerCase();
    }
}
