import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../services/weather.service';
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
     this.searchedCity.emit(cityName);
     this.checkToday = true;
  }

  onSearchDays(cityName: string, days: number) {
    this.searchedDays.emit({cityName, days});
    if (days !=1) this.checkToday = false;
  }

}
