import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-search-period',
  templateUrl: './search-period.component.html',
  styleUrls: ['./search-period.component.css']
})
export class SearchPeriodComponent implements OnInit {
  
  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
  }

  onSelect(daysCount: number) {
    let cityName = "London";
    let weatherItems = this._weatherService.getWeatherItemsByPeriod(cityName, daysCount);
  }

}
