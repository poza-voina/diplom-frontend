import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [
    NgForOf
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  currentDate: Date = new Date();
  monthName: string = '';
  year: number = 0;
  daysInMonth: (number | null)[] = [];

  ngOnInit(): void {
    this.updateCalendar();
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

    // Filling in days from previous month
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      this.daysInMonth.push(daysInPrevMonth - i);
    }

    // Filling in days of the current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
      this.daysInMonth.push(i);
    }

    // Filling in days from next month (if needed to complete the week)
    const remainingDays = 42 - this.daysInMonth.length;
    for (let i = 1; i <= remainingDays; i++) {
      this.daysInMonth.push(null);
    }
  }

  changeMonth(direction: number): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.updateCalendar();
  }
}
