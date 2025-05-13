import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UploadImageComponent} from '../../../../default-components/upload-image/upload-image.component';
import {RouteCardStatus} from '../../data/route-card.status';
import {IAttachment} from '../../../../../../data/IAttachment';
import {S3Helper} from '../../../../../../services/s3.helper';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-upload-image-card-body',
  imports: [
    UploadImageComponent,
    NgIf
  ],
  templateUrl: './upload-image-card-body.component.html',
  styleUrl: './upload-image-card-body.component.css'
})
export class UploadImageCardBodyComponent {
  @Output() fileSelected = new EventEmitter<File>();
  @Input() routeCardStatus: RouteCardStatus = RouteCardStatus.None;
  @Output() routeCardStatusChange = new EventEmitter<RouteCardStatus>();
  @Input() attachment: IAttachment | null = null;

  getImageUrl(uri: string | undefined) : string | null {
    console.log('getImageUrl', uri);
    return S3Helper.getImageUrlOrDefault(uri);
  }

  protected readonly RouteCardStatus = RouteCardStatus;
}
