import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {API_URLS} from '../api-routes.config';
import {BaseApiService} from './base-api-service';
import {AuthService} from './auth.service';

@Injectable(
  {providedIn: 'root'}
)
export class MapService extends BaseApiService {
  private apiUrl = `${API_URLS.admins}/map/address`;

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getAddressWithCoords(addressWithCoords: AddressWithCoords): Observable<AddressWithCoords> {
    let params = new HttpParams();

    Object.entries(addressWithCoords).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<AddressWithCoords>(`${this.apiUrl}`, { params, ...this.getOptions() });
  }
}

interface AddressWithCoords {
  latitude?: number | null;
  longitude?: number | null;
  address?: string | null;
}
