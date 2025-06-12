import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'modal-window',
  imports: [],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.css'
})
export class ModalWindowComponent {
  @Input() modalWindowId: string | undefined;
  @Output() modalWindowEvent: EventEmitter<void> = new EventEmitter();
  @Input()
  label: string = "Заголовок";
}
