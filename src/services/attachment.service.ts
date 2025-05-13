import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {catchError, EMPTY, map, Observable, of} from 'rxjs';
import {API_URLS} from '../api-routes.config';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private apiUrlGetCuePointAttachments = `${API_URLS.admins}/attachments/cuepoints`;
  private readonly cuepointsUploadUrl = `${API_URLS.admins}/attachments/cuepoints/upload`;
  private readonly routeUploadUrl = `${API_URLS.admins}/attachments/route/upload`;
  private apiUrlGetRouteAttachment = `${API_URLS.admins}/attachments/route`;

  constructor(private http: HttpClient) {}

  uploadCuePointsAttachments(files: File[], cuePointIds: number[]): Observable<any> {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file); // имя должно совпадать с параметром на бэке
    });

    cuePointIds.forEach(id => {
      formData.append('cuePointIds', id.toString()); // ASP.NET сам соберёт их в List<long>
    });

    return this.http.post(this.cuepointsUploadUrl, formData);
  }

  uploadRouteAttachment(file: File, routeId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('routeId', routeId.toString());
    return this.http.post(this.routeUploadUrl, formData);
  }
}
