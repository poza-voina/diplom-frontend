import { Component } from '@angular/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import {NgForOf} from '@angular/common';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {CalendarComponent} from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-route',
  imports: [
    FullCalendarModule,
    NgForOf,
    CalendarComponent
  ],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent {
  points = [
    {
      title: 'Старинный маяк',
      imageUrl: 'https://source.unsplash.com/600x300/?lighthouse',
      description: 'Построенный в XIX веке маяк. Великолепный вид на море.'
    },
    {
      title: 'Золотой пляж',
      imageUrl: 'https://source.unsplash.com/600x300/?beach',
      description: 'Лучший пляж с золотистым песком и чистой водой.'
    },
    {
      title: 'Руины замка',
      imageUrl: 'https://source.unsplash.com/600x300/?castle',
      description: 'Средневековые руины, окруженные зеленью.'
    }
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    initialDate: '2027-02-01',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: ''
    },
    plugins: [dayGridPlugin],
    locale: 'ru',
    firstDay: 1,

    // Основные настройки размера:
    height: 300, // Фиксированная высота всего календаря
    contentHeight: 'auto', // Автоматическая высота содержимого
    aspectRatio: 1, // Соотношение сторон (необязательно)

    // Оптимизация для компактного отображения:
    dayMaxEventRows: 1, // Максимум 1 ряд событий в ячейке
    fixedWeekCount: false, // Не фиксировать количество недель
    showNonCurrentDates: false, // Скрывать даты из других месяцев

    events: [
      // ваши события
    ]
  };
}
