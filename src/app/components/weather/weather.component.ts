import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherItem } from '../../models/weather-item/weather-item';
import { WeatherService } from '../../services/weather.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  weatherItems: WeatherItem;
  private searchTerms = new Subject<string>();
  private subscription: Subscription;
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // show weather item after successful search
    this.searchTerms
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term: string) =>
          this.weatherService.getWeatherItemsByCityName(term)
        )
      )
      .subscribe(
        data => {
          return (this.weatherItems = data);
        }
        // no error handling (it is handled on this._weatherService.getWeatherItemsByCityName(term)))
      );

    // search history item click
    this.subscription = this.weatherService.searchSubject.subscribe(
      data => {
        return (this.weatherItems = data);
      },
      error => {
        console.warn(error);
      }
    );
  }

  onSearchedCity(cityName: string) {
    this.searchTerms.next(cityName);
  }

  onSearchedDays(info: { cityName: string; days: number }) {
    if (info.cityName !== '') {
      this.weatherService
        .getWeatherItemsByCityName(info.cityName, info.days)
        .subscribe(
          data => {
            return (this.weatherItems = data);
          }
          // no error handling (it is handled on this._weatherService.getWeatherItemsByCityName(term)))
        );
    }
  }

  ngOnDestroy() {
    this.searchTerms.next();
    this.searchTerms.complete();
    this.subscription.unsubscribe();
  }
}
