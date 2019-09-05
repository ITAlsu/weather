import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherItem } from '../weather-item/weather-item';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {
  weatherItems: WeatherItem[];
  cityName: string;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
  }

  onSearch(cityName: string) {
    //this.weatherItems = this._weatherService.getWeatherItemsByCityName2(cityName);
    this._weatherService.getWeatherItemsByCityName(cityName).subscribe(x => {this.weatherItems = x as WeatherItem[] });
  }

}
