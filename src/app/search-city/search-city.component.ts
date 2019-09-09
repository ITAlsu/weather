import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherItem } from '../models/weather-item/weather-item';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {
  weatherItems: WeatherItem[];
  checkToday: boolean = true;
  @Output() searchedCity = new EventEmitter<string>();
  @Output() searchedDays = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onSearchCity(cityName: string) {
    this.checkToday = true;
    this.searchedCity.emit(cityName);
  }

  onSearchDays(cityName: string, days: number) {
    if (days !== 1) { this.checkToday = false; }
    this.searchedDays.emit({cityName, days});
  }

}
