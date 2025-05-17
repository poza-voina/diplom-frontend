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
  routeExampleRecords: IRouteExampleRecordWithClientW[] = [];
  routeExample: IRouteExample | null = null;

  constructor(private adminActionsService: AdminActionsService, private routeExampleRecordService: RouteExampleRecordService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('exampleId');
    this.routeExampleId = Number(param);

    let request: IGetFilteredRouteExampleRecords = {
      routeExampleId: this.routeExampleId.valueOf(),
    }

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

  }

  handleSave(i: number) {
    this.routeExampleRecords[i].editingStatus = EditingStatus.DEFAULT;
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
