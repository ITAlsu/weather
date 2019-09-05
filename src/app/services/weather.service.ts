import { Injectable } from '@angular/core';
import { WeatherItem } from '../weather-item/weather-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weatherItems: WeatherItem[] = [{
    cityName: "Shuzenji",
    id: 1851632,
    country: "JP",
    temper: 15,
    icon:  "02d"
  },
  {
    cityName: "Acd",
    id: 1851633,
    country: "JP",
    temper: 15,
    icon:  "02d"
  }];

  constructor(private _http: HttpClient) {}

  link = "http://api.openweathermap.org/data/2.5/weather?q=";
  linkPeriod = "http://api.openweathermap.org/data/2.5/forecast?q=";  
  KEY ="3be1d5e2239f3863fd54b5b254c32256";

  getWeatherItems(): WeatherItem[] {
    return this.weatherItems;
  }

  getWeatherItemsByCityName2(cityName: string): WeatherItem[] {
    return this.weatherItems.filter(function(city) {
      return city.cityName.includes(cityName);
    });
  }

  getWeatherItemsByCityName(cityName: string): Observable<any> {
    let list = this._http.get(this.linkPeriod + cityName + '&APPID='+ this.KEY +'&units=metric&cnt=3');
    return list;
  }
  
  getWeatherItemsByPeriod(cityName: string, days : number): Observable<any> {
    let list = this._http.get(this.linkPeriod + cityName + '&APPID='+ this.KEY +'&units=metric&cnt=7');
    return list;
  }

}
