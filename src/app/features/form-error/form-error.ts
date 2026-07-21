import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-error',

  standalone: true,
  imports: [],
  templateUrl: './form-error.html',
  styleUrl: './form-error.css',
})
export class FormError {
  error = input<string | boolean | null | undefined>(null);
}
