import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddressStatus} from '../../../../enums/address.status';
import {NavBarStatus, NavBarStatusHelper} from '../../../../enums/nav-bar.status';
import {CuePointStatus} from '../../../../enums/cue-point.status';
import {YandexSuggestionsService} from '../../../../services/yandex-suggest.service';
import {MapService} from '../../../../services/map-service';
import {IBaseRouteCuePoint} from '../../../../data/cuePoint/CuePoint';

@Component({
  selector: 'app-admin-cue-point-card',
  templateUrl: './admin-cue-point-card.component.html',
  styleUrl: './admin-cue-point-card.component.css',
  standalone: false,
})
export class AdminCuePointCardComponent implements OnInit {

  @Input() routeCuePointItem: IBaseRouteCuePoint | undefined;

  @Output() public onMoveLower = new EventEmitter();
  @Output() public onMoveHigher = new EventEmitter();
  @Output() public onPickedPoint = new EventEmitter<boolean>();

  navBarStatus: NavBarStatus = NavBarStatus.Info;
  isExpanded: boolean = false;

  addressSuggestions: string[] = []; // Список подсказок
  query: string = ''; // Строка запроса
  showSuggestions: boolean = false;
  cuePointStatus: CuePointStatus = CuePointStatus.None;

  constructor(private suggestionsService: YandexSuggestionsService, private mapService: MapService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {  }

  protected readonly NavBarStatus = NavBarStatus;
  protected readonly CuePointStatus = CuePointStatus;
  protected readonly NavBarStatusHelper = NavBarStatusHelper;

  checkAddress(): boolean {
    return this.routeCuePointItem?.address != null &&
      this.routeCuePointItem.latitude != null &&
      this.routeCuePointItem.longitude != null;
  }

  saveAddress() {
    const address = this.routeCuePointItem?.address;
    if (!address) {
      console.warn('Адрес не задан');
      return;
    }

    this.mapService.getAddressWithCoords({ address }).subscribe({
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
    });
  }

  toggleEditCuePoint() {
    if (this.cuePointStatus === CuePointStatus.None) {
      this.onPickedPoint.emit(true);
    }
    else if (this.cuePointStatus === CuePointStatus.Editing) {
      this.onPickedPoint.emit(false);
    }

    this.cuePointStatus = this.cuePointStatus == CuePointStatus.None ? CuePointStatus.Editing : CuePointStatus.None;
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
