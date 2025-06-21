import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {DatePipe, NgForOf, NgIf, NgStyle} from '@angular/common';
import {IRouteExample} from '../../../../../data/IRouteExample';
import {ISelectMonth} from '../../../../../dto/i-select.month';
import {routes} from '../../../../../app/app.routes';

@Component({
  selector: 'app-calendar',
  imports: [
    NgForOf,
    NgStyle,
    NgIf,
    DatePipe
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnChanges, OnInit {
  currentDate: Date = new Date();
  monthName: string = '';
  year: number = 0;
  daysInMonth: (number | null)[] = [];
  highlightedDays: Set<number> = new Set();
  MAX_SEATS = 10;  // Пример максимального числа мест
  selectedDay: number | null = null;  // Выбранный день для отображения меню
  routesForSelectedDay: IRouteExample[] = [];  // Список маршрутов для выбранного дня
  isTooltipPinned = false;
  tooltipVisible = false;

  @Input()
  routeExamplesByMonth: IRouteExample[] = [];

  @Input()
  routeId: number = 0;

  @Output()
  onInit = new EventEmitter<ISelectMonth>();

  @Output()
  onSelectMonth = new EventEmitter<ISelectMonth>();

  @Output()
  onSelectRouteExample = new EventEmitter<IRouteExample | null>();

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['routeExamplesByMonth'] && changes['routeExamplesByMonth'].currentValue) {
      this.updateCalendar(); // Перерисовываем календарь
      this.updateHighlightedDays(); // Пересчитываем выделенные дни
    }
  }

  ngOnInit(): void {
    this.updateCalendar();
    this.onInit.emit(this.currentDateToISelectedMonth());
    this.updateHighlightedDays(); // Обновляем подсветку при инициализации
  }

  updateHighlightedDays(): void {
    this.highlightedDays.clear(); // Очистка множества подсвеченных дней
    this.routeExamplesByMonth.forEach(item => {
      const day = new Date(item.startDateTime).getDate(); // Извлекаем день
      this.highlightedDays.add(day); // Добавляем в Set для подсветки
    });
  }

  currentDateToISelectedMonth(): ISelectMonth {
    return {
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth() + 1,
      routeId: this.routeId
    };
  }

  updateCalendar(): void {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    this.monthName = firstDayOfMonth.toLocaleString('ru-RU', { month: 'long' });
    this.year = this.currentDate.getFullYear();

    const daysInPrevMonth = (new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0)).getDate();
    const firstDayWeekday = firstDayOfMonth.getDay();
    const lastDateOfMonth = lastDayOfMonth.getDate();

    this.daysInMonth = [];

    // Заполняем дни с прошлого месяца
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      this.daysInMonth.push(daysInPrevMonth - i);
    }

    // Заполняем дни текущего месяца
    for (let i = 1; i <= lastDateOfMonth; i++) {
      this.daysInMonth.push(i);
    }

    // Заполняем дни следующего месяца (если нужно для заполнения недели)
    const remainingDays = 42 - this.daysInMonth.length;
    for (let i = 1; i <= remainingDays; i++) {
      this.daysInMonth.push(null);
    }

    // Обновляем подсветку после изменения календаря
    this.updateHighlightedDays();
  }

  changeMonth(direction: number): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.onSelectMonth.emit(this.currentDateToISelectedMonth())
    this.routeExamplesByMonth = [];
    this.updateCalendar(); // Обновляем календарь после смены месяца
  }

  isDayHighlighted(day: number | null): boolean {
    return day !== null && this.highlightedDays.has(day);
  }

// Проверка, есть ли свободные места
  mouseY: number = 0;
  mouseX: number = 0;
  isDayHasAvailableSeats(day: number | null): boolean {
    if (day === null) {
      return false;
    }

    // Проверяем есть ли хотя бы один экземпляр маршрута с доступными местами
    return this.routeExamplesByMonth.some(route =>
      new Date(route.startDateTime).getDate() === day && route.countRecords < this.MAX_SEATS);
  }

  isDayFullyBooked(day: number | null): boolean {
    if (day === null) {
      return false;
    }

    // Проверяем, что все маршруты на этот день имеют количество мест больше или равно MAX_SEATS
    const routesOnDay = this.routeExamplesByMonth.filter(route =>
      new Date(route.startDateTime).getDate() === day);

    // Если на день нет маршрутов, не считаем его полностью забронированным
    if (routesOnDay.length === 0) {
      return false;
    }

    // Проверяем, что все маршруты на день полностью забронированы
    return routesOnDay.every(route => route.countRecords >= this.MAX_SEATS);
  }

  showMenu(day: number | null, event: MouseEvent): void {
    if (day === null) return;
    if (this.isTooltipPinned) return;

    this.generateTooltipData(day, event);
  }

  generateTooltipData(day: number, event: MouseEvent): void {
    this.selectedDay = day;
    this.routesForSelectedDay = this.routeExamplesByMonth.filter(route =>
      new Date(route.startDateTime).getDate() === day
    );
    this.mouseX = event.clientX;
    this.mouseY = event.clientY + window.scrollY + 10;
    this.tooltipVisible = true;
  }

  hideMenu(): void {
    if (!this.isTooltipPinned) {
      this.tooltipVisible = false;
      this.selectedDay = null;
      this.routesForSelectedDay = [];
    }
  }

  onMouseLeaveCell(): void {
    if (!this.isTooltipPinned) {
      this.hideMenu();
    }
  }

  toggleShowMenu(day: number | null, event: MouseEvent): void {
    if (this.isTooltipPinned) {
      this.isTooltipPinned = false;
      this.tooltipVisible = false;
      this.selectedDay = null;
      this.routesForSelectedDay = [];
    } else {
      if (day === null) return;
      this.isTooltipPinned = true;
      this.generateTooltipData(day, event);
    }
    //this.onSelectRouteExample.emit(null);
  }

  handleSelectRoute(routeExample: IRouteExample) {
    console.log("handleSelectRoute");
    this.isTooltipPinned = false;
    this.onSelectRouteExample.emit(routeExample);
  }
}

