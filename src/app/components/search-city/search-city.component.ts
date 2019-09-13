import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { WeatherItem } from '../../models/weather-item/weather-item';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {
  weatherItems: WeatherItem;
  @Input() cityName: string;
  @Input() currentPeriod: string;
  @Output() searchedCity = new EventEmitter<string>();
  @Output() searchedDays = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
  }

  onSearchCity(city: string) {
    this.searchedCity.emit(city);
  }

  onSearchDays(city: string, days: number) {
    this.searchedDays.emit({ city, days });
  }

}
