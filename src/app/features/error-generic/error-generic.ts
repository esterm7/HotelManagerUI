import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-generic',
  imports: [],
  templateUrl: './error-generic.html',
  styleUrl: './error-generic.css',
})
export class ErrorGeneric {

constructor(private router: Router){

}

  VaiAHome() {
    this.router.navigate(['/home']);
  }
}
