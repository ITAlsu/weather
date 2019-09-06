import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherItem } from '../weather-item/weather-item';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {
  items:any[];
  weatherItems$: Observable<WeatherItem[]>;
  private searchTerms = new Subject<string>();
  daysCount: number;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.searchTerms
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => this._weatherService.getWeatherItemsByCityName(term)),
    ).subscribe(
      data => {
        return this.items = data;
    },
    error => console.warn(error)
    );

  }

  onSearchCity(cityName: string) {
    this.searchTerms.next(cityName);
  }

  onSearch(cityName: string, daysCount) {
    this.daysCount = daysCount;
    if (cityName !="") {
      this._weatherService.getWeatherItemsByCityName(cityName, daysCount).subscribe(
        data => {
          return this.items = data;
      },
      error => console.warn(error)
      );
    }

  }

}
