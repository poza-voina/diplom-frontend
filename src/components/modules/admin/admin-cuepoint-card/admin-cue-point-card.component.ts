import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() cuePointStatus: CuePointStatus = CuePointStatus.None;

  @Output() public onMoveLower = new EventEmitter();
  @Output() public onMoveHigher = new EventEmitter();
  @Output() public onPickedPoint = new EventEmitter<number | null>();

  navBarStatus: NavBarStatus = NavBarStatus.Info;
  isExpanded: boolean = false;

  addressSuggestions: string[] = []; // Список подсказок
  query: string = ''; // Строка запроса
  showSuggestions: boolean = false;

  @Output()
  fileSelected = new EventEmitter<File>();

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

  toggleEditCuePoint() {
    console.log("toggleEditCuePoint");
    console.log(this.routeCuePointItem?.title)
    console.log("test " + this.routeCuePointItem?.sortIndex)
    if (this.cuePointStatus === CuePointStatus.None) {
      this.onPickedPoint.emit(this.routeCuePointItem!.sortIndex);
    }
    else if (this.cuePointStatus === CuePointStatus.Editing) {
      this.onPickedPoint.emit(null);
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

  handleFileSelected(file: File) {
    this.fileSelected.emit(file);
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
