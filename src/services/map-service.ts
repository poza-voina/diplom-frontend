import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {BaseAuthService} from './base-auth.service';
import {AdminAuthService} from '../components/modules/admin/services/admin-auth.service';
import {environment} from '../env';

@Injectable(
  {providedIn: 'root'}
)
export class MapService extends BaseApiWithAuthService {
  private apiUrl = `${environment.apiUrl}/map/address`;

  constructor(http: HttpClient, authService: AdminAuthService) {
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
