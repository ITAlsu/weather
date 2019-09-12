import { WeatherItem } from '../models/weather-item/weather-item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SearchItem } from '../models/search-item/search-item';
import { WeatherHistoryService } from './weather-history.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'http://api.openweathermap.org/data/2.5/forecast?q=';
  urlCities = 'http://api.openweathermap.org/data/2.5/weather?q=';
  KEY = '3be1d5e2239f3863fd54b5b254c32256';

  searchSubject: Subject<any> = new Subject<any>();

  // consts for crutch, see comment below
  forecast = 8;

  constructor(
    private http: HttpClient,
    private weatherHistoryService: WeatherHistoryService
  ) {}

  loadHistory(weatherItem: WeatherItem) {
    this.searchSubject.next(weatherItem);
  }

  getWeatherItemsByCityName(cityName: string, days = 1): Observable<any> {
    if (!cityName.trim()) {
      return of([]);
    }

    return this.http
      .get<any>(
        `${this.url}${cityName}&APPID=${this.KEY}&units=metric&cnt=${days *
          this.forecast}`
      )
      .pipe(
        map(data => {
          this.weatherHistoryService.addSearchHistoryItem(
            new SearchItem(data.city.id, data.city.name, days)
          );
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
