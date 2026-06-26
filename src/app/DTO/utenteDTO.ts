export class UtenteDto {
    codiceUtente!: String;
    codiceUtenteError!: boolean;

    nome!: String;
    nomeError!: Boolean;
    
    cognome!: String;
    cognomeError!: Boolean;
    
    dataNascita!: Date;
    dataNascitaError!: Boolean;
    
    codiceFiscale!: String;
    codiceFiscaleError!: Boolean;
    
    livelloPermessi!: number;
    livelloPermessiError!: Boolean;

    constructor() {
    }

}