import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-documents-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './documents-form.component.html',
  styles: [`
    /* Add specific styles for this form section if needed */
  `]
})
export class DocumentsFormComponent {
  @Input() documentsForm!: FormGroup; // Receive FormGroup from parent
}