import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-layout',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './form-layout.html',
  styleUrl: './form-layout.css',
})
export class FormLayout {
  submitLabel = input('Salva');
  showReset = input(true);
  showBack = input(true);

  formSubmit = output<void>();
  formReset = output<void>();
  formBack = output<void>();
}