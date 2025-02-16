import { Component, Input, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent {
  invalidFeedback: string | null = null;
  @Input() label: string = '';
  @ContentChild('inputField', { static: false }) inputField: ElementRef | undefined;
}
