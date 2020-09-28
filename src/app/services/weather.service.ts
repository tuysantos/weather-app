import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, catchError, share } from 'rxjs/operators';
import {WeatherForeCast} from '../model/weather';
import { LocationType } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherByCityAndCountry(city: string, country?: string): Observable<LocationType[]> {
    const strUrl = `${environment.apiEndPoint}location/search/?query=${city}`;
    return this.http.get<LocationType[]>(strUrl)
        .pipe(
          map( (items: LocationType[]) => {
            return items;
          }),
          catchError(this.handleError)
        );
  }

  getWeatherDetailForeCast(woeid: number): Observable<WeatherForeCast> {
    const strUrl = `${environment.apiEndPoint}location/${woeid}`;
    return this.http.get<WeatherForeCast>(strUrl).pipe(
      map((item: WeatherForeCast) => {
        return item;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof Error) {
      let errMessage = error.error;
      return Observable.throw(errMessage);
    }
    return Observable.throw(`${error.status} - ${error.error.errors[0].title}`);
  }

  private handleError1(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error);
  }
}
