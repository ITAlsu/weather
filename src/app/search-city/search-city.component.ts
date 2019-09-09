import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherItem } from '../models/weather-item';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {
  weatherItems: WeatherItem[];
  @Output() searchedCity = new EventEmitter<string>();
  @Output() searchedDays = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onSearchCity(cityName: string) {
      this.searchedCity.emit(cityName);
  }

  onSearchDays(cityName: string, days: number) {
    this.searchedDays.emit({cityName, days});
  }
}
