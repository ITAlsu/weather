import { WeatherItem } from '../models/weather-item/weather-item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_ENDPOINT, KEY, FORECAST } from '../store/app-config';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(
    private http: HttpClient
  ) {}

  getWeatherItemsByCityName(cityName: string, days = 1): Observable<any> {
    if (!cityName.trim()) {
      return of([]);
    }

    return this.http
      .get<any>(
        `${API_ENDPOINT}${cityName}&APPID=${KEY}&units=metric&cnt=${days *
          FORECAST}`
      )
      .pipe(
        map(data => {
          return new WeatherItem(
            data.city.id,
            data.city.name,
            data.city.country,
            data.list.length,
            data.list
          );
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return of([]);
  }
}
