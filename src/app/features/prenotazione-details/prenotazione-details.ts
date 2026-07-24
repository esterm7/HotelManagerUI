import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../../core/services/service';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { PrenotazioneDTO } from '../../DTO/prenotazioneDTO';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-prenotazione-details',
  imports: [FormsModule],
  templateUrl: './prenotazione-details.html',
  styleUrl: './prenotazione-details.css',
})
export class PrenotazioneDetails {  

  private dialogRef = inject(DialogRef<Boolean>);
  
  prenotazioneDTO = inject<PrenotazioneDTO>(DIALOG_DATA);

  constructor(private router: Router, private prenotazioneService: Service, private cdr: ChangeDetectorRef) {
  }


  ngOnInit() {
       console.log('Prenotazione ricevuta:', this.prenotazioneDTO);
  };
 
  chiudi() {
    this.dialogRef.close(false);
  }
}


