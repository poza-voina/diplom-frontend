import {Component, OnInit} from '@angular/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {ActivatedRoute} from '@angular/router';
import {RouteService} from '../../../../../services/route.service';
import {IRouteCuePointItem} from '../../../../../data/CuePoint';
import {IRouteItem} from '../../../../../data/IRouteItem';
import {AttachmentService} from '../../../../../services/attachment.service';

@Component({
  selector: 'app-route',
  imports: [
    FullCalendarModule,
    NgForOf,
    CalendarComponent,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent implements OnInit {
  cuePoints: IRouteCuePointItemWithAttachment[] = [];
  routeItem: IRouteItem | null = null;

  private routeId: number;

  constructor(private route: ActivatedRoute, private routeService: RouteService, private attachmentService: AttachmentService) {
    this.routeId = +this.route.snapshot.paramMap.get('routeId')!;
  }

  ngOnInit(): void {
    this.routeService.getRouteCuePoints(this.routeId).subscribe({
      next: (cuePoints) => {
        const cuePointIds: number[] = cuePoints
          .map(cp => cp.id)
          .filter((id): id is number => id !== null);

        if (cuePointIds.length === 0) return;

        this.attachmentService.getAttachmentsByCuePoints(cuePointIds).subscribe({
          next: (attachments: IAttachment[]) => {
            const cuePointsWithAttachments: IRouteCuePointItemWithAttachment[] = cuePoints.map(cp => {
              const match = attachments.find((att: IAttachment) => att.cuePointId === cp.id);
              return {
                ...cp,
                imageUri: match?.uri || null
              };
            });

            this.cuePoints = cuePointsWithAttachments;
          }
        });
      }
    });
  }

}

export interface IRouteCuePointItemWithAttachment extends IRouteCuePointItem {
  imageUri: string | null;
}
export interface IAttachment {
  id: number;
  uri: string;
  cuePointId: number;
  // другие поля...
}
