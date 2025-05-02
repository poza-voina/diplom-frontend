import {HttpHeaders} from '@angular/common/http';

export abstract class BaseApiService {
  protected getOptions(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return { headers };
  }
}
