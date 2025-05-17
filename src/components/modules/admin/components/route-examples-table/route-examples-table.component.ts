import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {IRouteExample} from '../../../../../data/IRouteExample';
import {map} from 'rxjs';
import {RouteService} from '../../../../../services/route.service';
import {FormsModule} from '@angular/forms';
import * as bootstrap from 'bootstrap';
import {AdminActionsService} from '../../../../../services/admin-actions.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-route-examples-table',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './route-examples-table.component.html',
  styleUrl: './route-examples-table.component.css'
})
export class RouteExamplesTableComponent implements OnInit {
  routeExamples: IRouteExampleItemW[] = [];
  @Input()
  routeId!: number;
  RouteExampleItemWStatus = RouteExampleItemWStatus;


  constructor(
    private routeService: RouteService,
    private adminActionsService: AdminActionsService,
    private router: Router,
  private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.routeId === undefined) {
      throw new Error('No route id provided');
    }

    this.loadRouteExamples();
  }

  loadRouteExamples() {
    this.routeService.getRouteExamples(this.routeId).pipe(
      map(items => items.map(item => this.mapRouteExample(item)))
    ).subscribe(items => {
      this.routeExamples = items;
    });
  }

  mapRouteExample(item: IRouteExample): IRouteExampleItemW {
    this.reformatExamplesDatetime(item);
    return {...item, editingStatus: RouteExampleItemWStatus.DEFAULT} as IRouteExampleItemW
  }

  reformatExamplesDatetime(data: IRouteExample) {
    data.creationDateTime = this.reformatDatetime(data.creationDateTime);
    data.startDateTime = this.reformatDatetime(data.startDateTime);
    data.endDateTime = this.reformatDatetime(data.endDateTime);
  }

  reformatDatetime(datetime: string) {
    let date = new Date(datetime);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  handleRemove(index: number) {
    let removedExampleId = this.routeExamples.splice(index, 1)[0].id;
    if (removedExampleId !== null && removedExampleId > 0) {
      this.adminActionsService.deleteRouteExample(removedExampleId).subscribe(
        {
          next: (response) => console.log("ok"),
          error: (error) => console.log(error)
        }
      );
    }
  }

  addRouteExample() {
    this.routeExamples.unshift(this.getEditingRouteExample())
  }

  getEditingRouteExample(): IRouteExampleItemW {
    const today = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const defaultDatetime = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}T00:00`;

    return {
      creationDateTime: '',
      id: 0,
      routeId: 0,
      status: "Pending",
      startDateTime: defaultDatetime,
      endDateTime: defaultDatetime,
      editingStatus: RouteExampleItemWStatus.EDITING,
      countRecords: 0
    }
  }

  toggleDropdown(index: number): void {
    const triggerEl = document.getElementById('dropdownMenuButton' + index);
    if (triggerEl) {
      const dropdown = bootstrap.Dropdown.getOrCreateInstance(triggerEl);
      dropdown.toggle();  // Переключает состояние (если открыто, закроет, если закрыто, откроет)
    }
  }

  onStartDateChange(index: number) {
    const item = this.routeExamples[index]; // Получаем текущий элемент массива
    if (item.startDateTime) {
      const startDate = new Date(item.startDateTime); // Преобразуем строку в объект Date

      // Добавляем 6 часов к времени начала (если нужно)
      startDate.setHours(startDate.getHours() + 6);

      // Создаем новую дату для endDateTime, копируя startDate, но сбрасываем время на 00:00
      const endDate = new Date(startDate);
      endDate.setHours(0, 0, 0, 0); // Устанавливаем время на 00:00

      // Форматируем дату для поля datetime-local (с временем 00:00)
      const year = endDate.getFullYear();
      const month = String(endDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
      const day = String(endDate.getDate()).padStart(2, '0');
      const hours = String(endDate.getHours()).padStart(2, '0');
      const minutes = String(endDate.getMinutes()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

      // Устанавливаем новое значение для endDateTime
      item.endDateTime = formattedDate;
    }
  }

  handleSave(index: number) {
    this.routeExamples[index].routeId = this.routeId;
    let item = this.routeExamples[index];
    item.editingStatus = RouteExampleItemWStatus.DEFAULT

    this.adminActionsService.createOrUpdateRouteExample(item)
      .pipe(
        map(item => this.mapRouteExample(item)))
      .subscribe({
        next: (response) => {
          this.routeExamples[index] = response;
        },
        error: (err) => {
          console.error('Ошибка при сохранении:', err);
        }
      });
  }

  handleSaveAll() {
    for (const item of this.routeExamples) {
      item.editingStatus = RouteExampleItemWStatus.DEFAULT
      item.routeId = this.routeId;
    }

    this.adminActionsService
      .createOrUpdateRouteExamples(this.routeExamples)
      .pipe(map(items => items.map(item => this.mapRouteExample(item))))
      .subscribe(items => {
        this.routeExamples = items;
      });
  }

  handleEdit(index: number) {
    this.routeExamples[index].editingStatus = RouteExampleItemWStatus.EDITING;
  }

  goToRecords(exampleId: number) {
    console.log('goToRecords', exampleId);
    this.router.navigate(['examples', exampleId, 'records'],  { relativeTo: this.route });
  }
}

export enum RouteExampleItemWStatus {
  DEFAULT,
  EDITING
}

export interface IRouteExampleItemW extends IRouteExample {
  editingStatus: RouteExampleItemWStatus;
}
