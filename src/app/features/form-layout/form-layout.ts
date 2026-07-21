// form-layout/form-layout.ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  templateUrl: './form-layout.html',
  styleUrl: './form-layout.css',
})
export class FormLayout {
  submitLabel = input('Salva');
  showReset = input(true);
  showBack = input(true);

  submit = output<void>();
  reset = output<void>();
  back = output<void>();
}