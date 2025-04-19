import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouteCardStatus} from '../../data/route-card.status';
import {RouteItem} from '../../../../../../data/RouteItem';
import {ModalWindowComponent} from '../../../../../base/modal-window/modal-window.component';

@Component({
  selector: 'app-route-card-body',
  imports: [
    NgSwitchCase,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgSwitch,
    ModalWindowComponent
  ],
  templateUrl: './route-card-body.component.html',
  styleUrl: './route-card-body.component.css'
})
export class RouteCardBodyComponent {
  @Input()
  routeItem?: RouteItem;
  protected readonly RouteCardStatus = RouteCardStatus;
  @Output() routeItemChange = new EventEmitter<RouteItem | null>();
  @Input() routeCardStatus!: RouteCardStatus;
  @Output() routeCardStatusChange = new EventEmitter<RouteCardStatus>();
}
