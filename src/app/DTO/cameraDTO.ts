

export class CameraDto {
   

    postiLetto: number | null = null;
    postiLettoError!: boolean | string;
    tipologia: number |null = null;
    tipologiaError!: boolean | string;
    tariffa!: number;
    tariffaError!: boolean | string;

    codiceCamera!: string;
    codiceCameraError!: boolean | string;

    constructor () {
      

    }

    validazioneInput(cameraDTO: CameraDto) {
        
        this.postiLettoError = false;
        this.tipologiaError = false;
        this.tariffaError = false;  
    
        
        this.validazionePostiLetto();
        this.validazioneTipologia();
        this.validazioneTariffa();

    }



validazionePostiLetto() {
        if (!this.postiLetto) { // non mi serve fare altre verifiche tanto ho il dropdown
            this.postiLettoError = 'Inserire posti letto';
        }
}


validazioneTipologia() {
    if (!this.tipologia) {
        this.tipologiaError = 'Inserire tipologia della camera';
    }
}


validazioneTariffa() {

      const valore = Number(this.tariffa)
    if (!this.tariffa) {
        this.tariffaError = 'Inserire tariffa';
    } else if (isNaN(valore)) {
        this.tariffaError = 'Inserire un valore numerico valido';
    } else if (valore < 200) {
        this.tariffaError = 'La tariffa minima consentita è 200€ a notte';
    } else if (valore > 5500) {
        this.tariffaError = 'La tariffa massima consentita è 5500€ a notte';
    }
}

}
   

        //genera un codice univoco per la camera basato sulla tipologia e sul numero di posti letto
      
// spostare metodo per creare codici univoci camere a be, fare verifica che il codice non esista già nel db,
//  se esiste generare un nuovo codice univoco, altrimenti salvare la camera con il codice univoco generato


