import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URLS} from '../api-routes.config';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  private apiUrl = `${API_URLS.admins}/attachments/cuepoints`;

  constructor(private http: HttpClient) {}

  // Метод для получения аттачментов по ключевым точкам
  getAttachmentsByCuePoints(cuePointIds: number[]): Observable<any> {
    let params = new HttpParams();
    cuePointIds.forEach((id) => {
      params = params.append('cuePointIds', id.toString());
    });

    return this.http.get<any>(this.apiUrl, { params });
  }
}
