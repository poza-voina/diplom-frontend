import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IRouteCuePointItem} from '../../../../data/CuePoint';
import { AddressStatus } from '../../../../enums/address.status';
import { NavBarStatus, NavBarStatusHelper } from '../../../../enums/nav-bar.status';
import { CuePointStatus } from '../../../../enums/cue-point.status';
import {YandexSuggestionsService} from '../../../../services/yandex-suggest-service';
import {MapService} from '../../../../services/map-service';

@Component({
  selector: 'app-admin-cue-point-card',
  templateUrl: './admin-cue-point-card.component.html',
  styleUrl: './admin-cue-point-card.component.css',
  standalone: false,
})
export class AdminCuePointCardComponent implements OnInit {

  @Input() routeCuePointItem: IRouteCuePointItem | undefined;

  @Output() public onMoveLower = new EventEmitter();
  @Output() public onMoveHigher = new EventEmitter();

  navBarStatus: NavBarStatus = NavBarStatus.Name;
  cuePointStatus: CuePointStatus = CuePointStatus.None;
  addressStatus: AddressStatus = AddressStatus.None;
  isExpanded: boolean = false;

  addressSuggestions: string[] = []; // Список подсказок
  query: string = ''; // Строка запроса
  showSuggestions: boolean = false;

  constructor(private suggestionsService: YandexSuggestionsService, private mapService: MapService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {  }

  protected readonly NavBarStatus = NavBarStatus;
  protected readonly CuePointStatus = CuePointStatus;
  protected readonly AddressStatus = AddressStatus;

  toggleEditCuePoint() {
    this.cuePointStatus = this.cuePointStatus == CuePointStatus.Editing ? CuePointStatus.None : CuePointStatus.Editing;
    if (this.cuePointStatus == CuePointStatus.None) {

    } else if (this.cuePointStatus == CuePointStatus.Editing) {

    }
  }

  protected readonly NavBarStatusHelper = NavBarStatusHelper;

  checkAddress(): boolean {
    return this.routeCuePointItem?.address != null &&
      this.routeCuePointItem.latitude != null &&
      this.routeCuePointItem.longitude != null;
  }

  toggleEditAddress() {
    let current = this.addressStatus;
    console.log("toggleEditAddress", current);
    if (current == AddressStatus.None) {
      this.addressStatus = AddressStatus.Editing;
      console.log("toggleEditAddress", current);
    } else if (current == AddressStatus.Editing) {
      this.addressStatus = AddressStatus.Saving;
      this.mapService.getAddressWithCoords({"address": this.routeCuePointItem?.address}).subscribe({
        next: (response) => {
          if (response?.address && response?.latitude && response?.longitude) {
            this.routeCuePointItem!.address = response.address;
            this.routeCuePointItem!.latitude = response.latitude;
            this.routeCuePointItem!.longitude = response.longitude;
          }
        },
        error: (err) => {
          console.error('Ошибка при получении адреса:', err);
        },
        complete: () => {
          this.addressStatus = AddressStatus.None;
        }
      });
    }
  }

  selectAddress(suggestion: string) {
    if (this.routeCuePointItem?.address) {
      this.routeCuePointItem.address = suggestion;
      this.addressSuggestions = [];
      this.showSuggestions = false;
    }
  }

  hideSuggestions() {
    setTimeout(() => this.showSuggestions = false, 200); // Даем время на клик
  }

  onAddressInput($event: Event): void {
    const inputElement = $event.target as HTMLInputElement;
    const query = inputElement.value.trim(); // Убираем лишние пробелы
    this.showSuggestions = true;

    if (query.length < 3) {
      this.addressSuggestions = []; // Очищаем список, если запрос короткий
      return;
    }

    this.suggestionsService.getAddressSuggestions(query).subscribe({
      next: (data) => {
        console.log(data);
        this.addressSuggestions = data; // Сохраняем результат в suggestions
      },
      error: (err) => {
        console.error('Ошибка получения подсказок: ', err);
      }
    });

    console.log(this.addressSuggestions);
  }
}


export class StatusPipeline<T> {
  private _currentIndex: number = 0;
  private readonly _line: T[];

  constructor(line: T[]) {
    this._line = line;
  }

  next(): T {
    this._currentIndex = (this._currentIndex + 1) % this._line.length;
    return this._line[this._currentIndex]
  }

  get current(): T {
    return this._line[this._currentIndex];
  }
}
