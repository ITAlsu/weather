import { Component, OnInit } from '@angular/core';
import { SearchItem } from '../models/search-item/search-item';
import { WeatherHistoryService } from '../services/weather-history.service';
import { WeatherComponent } from '../weather/weather.component';
import { WeatherService } from '../services/weather.service';
import { WeatherItem } from '../models/weather-item/weather-item';
import { WeatherData } from '../models/weather-data/weather-data';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  searchHistoryItems: SearchItem[];
  searchHistoryItem: SearchItem;
  constructor(private _weatherHistoryService: WeatherHistoryService,
              private _weatherService: WeatherService) { }

  ngOnInit() {
    this._weatherHistoryService.searchSubject.subscribe(
        data => {
          this.getSearchHistoryItems();
          return this.searchHistoryItem = data;
        },
        error => {
          console.warn(error);
        }
      );
    this.getSearchHistoryItems();
  }

  getSearchHistoryItems() {
    this.searchHistoryItems = this._weatherHistoryService.getSearchHistoryItems();
  }

  deleteSearchHistoryItem(id: number, days: number) {
    this._weatherHistoryService.deleteSearchHistoryItem(id, days);
    this.getSearchHistoryItems();
  }

  repeatSearch(cityName: string, days: number) {
    this._weatherService.getWeatherItemsByCityName(cityName, days)
    .subscribe(
      data => {
        const weatherData: WeatherData[] = [];
        for (let index = 0; index < data.weatherData.length; index++) {
          const element = data.weatherData[index];
          weatherData[index] = new WeatherData(element.temperMin, element.temperMax, element.icon);
        }
        const weatherItem = new WeatherItem(data.city.id, data.city.name, data.city.country, data.list.length, weatherData);
        this._weatherService.changeItem(weatherItem);
      }
    );
    
  }
}
