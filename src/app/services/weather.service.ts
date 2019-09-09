import { WeatherItem } from '../models/weather-item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SearchItem } from '../models/search-item';
import { WeatherHistoryService } from './weather-history.service';
import { WeatherData } from '../models/weather-data';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = "http://api.openweathermap.org/data/2.5/forecast?q=";  
  urlCities ="http://api.openweathermap.org/data/2.5/weather?q=";
  KEY ="3be1d5e2239f3863fd54b5b254c32256";

  constructor(private _http: HttpClient,
              private _weatherHistoryService: WeatherHistoryService) {}

  getWeatherItemsByCityName(cityName: string, days = 1): Observable<any> {
    if (!cityName.trim()) {
      return of([]);
    }

    return this._http.get<any>(`${this.url}${cityName}&APPID=${this.KEY}&units=metric&cnt=${days}`)
      .pipe(map(data => {
            let weatherData: WeatherData[] = [];
            for (let index = 0; index < data.list.length; index++) {
              const element = data.list[index];
              weatherData[index] = new WeatherData(element.main.temp_min, element.main.temp_max, element.weather[0].icon);
            }
            this._weatherHistoryService.addSearchHistoryItem(new SearchItem(data.city.id, data.city.name, days));
            return new WeatherItem(data.city.id, data.city.name, data.city.country, data.list.length, weatherData);
        }));
  }
}