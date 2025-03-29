import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable(
  {providedIn: 'root'}
)
export class MapService {
  private apiUrl = 'https://localhost:5233/api/map/address';

  constructor(private http: HttpClient) {  }

  getAddressWithCoords(addressWithCoords: AddressWithCoords): Observable<AddressWithCoords> {
    let params = new HttpParams();

    Object.entries(addressWithCoords).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<AddressWithCoords>(`${this.apiUrl}`, { params });
  }
}

interface AddressWithCoords {
  latitude?: number | null;
  longitude?: number | null;
  address?: string | null;
}
