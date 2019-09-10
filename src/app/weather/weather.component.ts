import { Component, OnInit } from '@angular/core';
import { WeatherItem } from '../models/weather-item/weather-item';
import { WeatherService } from '../services/weather.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { WeatherHistoryService } from '../services/weather-history.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  weatherItems: WeatherItem;
  private searchTerms = new Subject<string>();
  constructor(private _weatherService: WeatherService,
              private _weatherHistoryService: WeatherHistoryService) { }

  ngOnInit() {
    this.searchTerms
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => this._weatherService.getWeatherItemsByCityName(term)),
    ).subscribe(
      data => {
        return this.weatherItems = data;
      }
      // no error handling (it is handled on this._weatherService.getWeatherItemsByCityName(term)))
    );

    this._weatherService.searchSubject.subscribe(
      data => {
        return this.weatherItems = data;
      },
      error => {
        console.warn(error);
      }
    );
  // this.getSearchHistoryItems();
    // this._weatherService.currentItem.subscribe(data => {
    //   return this.weatherItems = data;
    // });
  }

  onSearchedCity(cityName: string) {
    this.searchTerms.next(cityName);
  }

  onSearchedDays(info: {cityName: string, days: number}) {
     if (info.cityName !== '') {
      this._weatherService.getWeatherItemsByCityName(info.cityName, info.days).subscribe(
        data => {
          return this.weatherItems = data;
        }
        // no error handling (it is handled on this._weatherService.getWeatherItemsByCityName(term)))
      );
    }
  }


}
