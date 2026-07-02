

export class CameraDto {
   

    postiLetto!: number;
    postiLettoError!: boolean | string;
    tipologia!: number;
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
        this.codiceCameraError = false;


        if (!cameraDTO.postiLetto || cameraDTO.postiLetto < 1) {
            this.postiLettoError = true;
        } 
        if (!cameraDTO.tipologia || cameraDTO.tipologia < 1 || cameraDTO.tipologia > 3) {
            this.tipologiaError = true;
        }         
        
        if (isNaN(this.tariffa) || this.tariffa  < 0) {
            this.tariffaError = 'Inserisci un valore numerico valido';
        }  
    } 
   

        //genera un codice univoco per la camera basato sulla tipologia e sul numero di posti letto
        creaCodiceCamera() {
            const tipologia = this.tipologia;
            const postiLetto = this.postiLetto;
            const randomNum = Math.floor(Math.random() * 1000);
            this.codiceCamera = `C${tipologia}${postiLetto}${randomNum}`;

}
}
// spostare metodo per creare codici univoci camere a be, fare verifica che il codice non esista già nel db,
//  se esiste generare un nuovo codice univoco, altrimenti salvare la camera con il codice univoco generato

