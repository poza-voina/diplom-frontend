import {Component, OnInit} from '@angular/core';
import {RouteService} from '../../../../../services/route.service';
import {
  IGetFilteredRouteExampleRecords,
  RouteExampleRecordService
} from '../../../../../services/route-example-record.service';
import {ActivatedRoute} from '@angular/router';
import {IRouteExampleRecord, IRouteExampleRecordWithClient} from '../../../../../data/IRouteExampleRecord';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {map} from 'rxjs';
import {IRouteExample} from '../../../../../data/IRouteExample';
import {AdminActionsService} from '../../../../../services/admin-actions.service';
import {IBaseRoute} from '../../../../../data/route/IBaseRoute';

@Component({
  selector: 'app-route-example-records',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './route-example-records.component.html',
  styleUrl: './route-example-records.component.css'
})
export class RouteExampleRecordsComponent implements OnInit {
  routeExampleId: number | null = null;
  routeId: number | null = null;
  routeExampleRecords: IRouteExampleRecordWithClientW[] = [];
  routeExample: IRouteExample | null = null;
  routeItem: IBaseRoute | null = null;

  constructor(private adminActionsService: AdminActionsService, private routeService: RouteService, private routeExampleRecordService: RouteExampleRecordService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const routeExampleId = this.route.snapshot.paramMap.get('exampleId');
    this.routeExampleId = Number(routeExampleId);

    const routeId = this.route.snapshot.paramMap.get('routeId');
    this.routeId = Number(routeId);

    let request: IGetFilteredRouteExampleRecords = {
      routeExampleId: this.routeExampleId.valueOf(),
    }

    this.routeService.getRoute(this.routeId).subscribe(
      {next: x => this.routeItem = x}
    )

    this.adminActionsService.getRouteExample(this.routeExampleId).subscribe(
      {next: x =>  this.routeExample = x}
    )

    this.routeExampleRecordService.getRouteExampleRecordsWithClient(request)
      .pipe(
        map(records => records.map(record => ({
          ...record,
          editingStatus: EditingStatus.DEFAULT
        })))
      )
      .subscribe({
        next: recordsWithStatus => {
          this.routeExampleRecords = recordsWithStatus;
        }
      });
  }

  handleSaveAll() {
    this.adminActionsService.updateRecordsStatuses(this.routeExampleRecords).subscribe();
  }

  handleSave(i: number) {
    this.routeExampleRecords[i].editingStatus = EditingStatus.DEFAULT;
    this.adminActionsService.updateRecordStatus(this.routeExampleRecords[i]).subscribe();
  }

  handleEdit(i :number) {
    this.routeExampleRecords[i].editingStatus = EditingStatus.EDITING;
  }

  protected readonly EditingStatus = EditingStatus;
}

interface IRouteExampleRecordWithClientW extends IRouteExampleRecordWithClient{
  editingStatus: EditingStatus
}

enum EditingStatus {
  DEFAULT,
  EDITING
}
