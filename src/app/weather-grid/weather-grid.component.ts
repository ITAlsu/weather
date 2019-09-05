import { Component, OnInit } from '@angular/core';
import { WeatherItem } from '../weather-item/weather-item';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-grid',
  templateUrl: './weather-grid.component.html',
  styleUrls: ['./weather-grid.component.css']
})
export class WeatherGridComponent implements OnInit {
  weatherItems: WeatherItem[];

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherItems = this._weatherService.getWeatherItems();
  }

}
