import { WeatherItem } from '../models/weather-item/weather-item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SearchItem } from '../models/search-item/search-item';
import { WeatherHistoryService } from './weather-history.service';
import { WeatherData } from '../models/weather-data/weather-data';
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
  averageTemperatureHours = 15; // 15:00

  constructor(private _http: HttpClient,
              private _weatherHistoryService: WeatherHistoryService) {}

  loadHistory(weatherItem: WeatherItem) {
    this.searchSubject.next(weatherItem);
  }

  getWeatherItemsByCityName(cityName: string, days = 1): Observable<any> {
    if (!cityName.trim()) {
      return of([]);
    }

    // crutch : API returns only weather for max 5 day / 3 hour forecast each 
    // to get the averaged temperature for more than 1 day - is not for FREE =(
    // here we take only 15:00 weather info as if it is an averaged temperature
    // 24h every / 3 hour = 8 results, so Api returns 8 results per day. We take the one with time 15:00
    return this._http.get<any>(`${this.url}${cityName}&APPID=${this.KEY}&units=metric&cnt=${days*this.forecast}`)
      .pipe(map(data => {
            const weatherData: WeatherData[] = [];
            for (let index = 0; index < data.list.length; index++) {
              const element = data.list[index];

              // crutch : API returns only weather for 5 day / 3 hour forecast
              // here we take only 15:00 weather info
              if ((new Date(1000*element.dt)).getHours() === this.averageTemperatureHours) {
                weatherData.push(new WeatherData(element.main.temp_min, element.main.temp_max, element.weather[0].icon, String(1000*element.dt)));
              }
            }
            this._weatherHistoryService.addSearchHistoryItem(new SearchItem(data.city.id, data.city.name, days));
            return new WeatherItem(data.city.id, data.city.name, data.city.country, data.list.length, weatherData);
        }), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return of([]);
  }
}
