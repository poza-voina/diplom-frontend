import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  imports: [
  ]
})
export class TestComponent {
  userName = 'Алексей';

  upcomingRoutes = [
    {
      id: 1,
      title: 'Загадочные горы Кавказа',
      date: new Date('2025-05-20'),
      image: 'assets/images/caucasus.jpg'
    },
    // ...
  ];

  completedRoutes = [
    {
      id: 2,
      title: 'Балтийское побережье',
      completedDate: new Date('2024-09-10'),
      image: 'assets/images/baltic.jpg'
    },
    // ...
  ];

  favoriteRoutes = [
    {
      id: 3,
      title: 'Питер — культурная столица',
      category: 'Городские маршруты',
      image: 'assets/images/saint-petersburg.jpg'
    },
    // ...
  ];
}
