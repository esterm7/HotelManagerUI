import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private platformId = inject(PLATFORM_ID);

  show(message: string) {
    if (isPlatformBrowser(this.platformId)) {
      alert(message);
    }
  }

}