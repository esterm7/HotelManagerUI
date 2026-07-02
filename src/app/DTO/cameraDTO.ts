

export class CameraDto {
   

    postiLetto!: number;
    postiLettoError!: boolean;
    tipologia!: number;
    tipologiaError!: boolean;
    tariffa!: number;
    tariffaError!: boolean;

    codiceCamera!: string;
    codiceCameraError!: boolean;

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
        
        if (!cameraDTO.tariffa || cameraDTO.tariffa < 50 || cameraDTO.tariffa > 5000 || isNaN(cameraDTO.tariffa)) {
            this.tariffaError = true;
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

