import { Component, OnInit } from '@angular/core';
import { WeatherItem } from '../models/weather-item';
import { WeatherService } from '../services/weather.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  weatherItems: WeatherItem[] = [];
  cityName:string ='';
  private searchTerms = new Subject<string>();
  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.searchTerms
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => this._weatherService.getWeatherItemsByCityName(term)),
    ).subscribe(
      data => {
        return this.weatherItems = data;
    },
    error => console.warn(error)
    );
  }

  onSearchedCity(cityName: string) {
    this.searchTerms.next(cityName);
  }

  onSearchedDays(info: {cityName: string, days: number}) {
     if (info.cityName !="") {
      this._weatherService.getWeatherItemsByCityName(info.cityName, info.days).subscribe(
        data => {
          return this.weatherItems = data;
      },
      error => console.warn(error)
      );
    }
  }
}
