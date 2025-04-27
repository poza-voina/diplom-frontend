import { Component, OnInit } from '@angular/core';
import {Router, NavigationError, Event, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationError) {
        console.error('Ошибка маршрута', event.error); // Выводит ошибку маршрута
        console.log('Путь, который не найден:', event.url); // Выводит недействительный URL
      }
    });
  }
}
