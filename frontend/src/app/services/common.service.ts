import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _baseURL = 'http://localhost:3000/';
  private _allEventsUrl = this._baseURL + 'api/events/all';
  private _specialEventsUrl = this._baseURL + 'api/events/special';

  constructor(private _http: HttpClient) { }

  specialEvents() {
    return this._http.get<any>(this._specialEventsUrl);
  }

  allEvents() {
    return this._http.get<any>(this._allEventsUrl);
  }


}
