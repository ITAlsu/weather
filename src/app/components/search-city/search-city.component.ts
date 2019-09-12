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
  checkToday = true;
  check3Days = false;
  check5Days = false;
  @Input() cityName = '';
  @Output() searchedCity = new EventEmitter<string>();
  @Output() searchedDays = new EventEmitter<any>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // search history item click
    this.weatherService.searchSubject.subscribe(
      data => {
        this.activateCurrentPeriod(data.days / 8);
        return (this.cityName = data.cityName);
      },
      error => {
        console.warn(error);
      }
    );
  }

  onSearchCity(cityName: string) {
    this.activateCurrentPeriod(1);
    this.searchedCity.emit(cityName);
  }

  onSearchDays(cityName: string, days: number) {
    this.activateCurrentPeriod(days);
    this.searchedDays.emit({ cityName, days });
  }

  activateCurrentPeriod(checkPeriod: number) {
    switch (checkPeriod) {
      case 1:
        this.checkToday = true;
        this.check3Days = false;
        this.check5Days = false;
        break;
      case 3:
        this.checkToday = false;
        this.check3Days = true;
        this.check5Days = false;
        break;
      case 5:
        this.checkToday = false;
        this.check3Days = false;
        this.check5Days = true;
        break;
    }
  }
}
