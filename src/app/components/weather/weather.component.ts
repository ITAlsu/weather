import { Component, OnInit } from '@angular/core';
import { WeatherItem } from '@models/weather-item/weather-item';
import { WeatherService } from '@services/weather.service';
import { SearchItem } from '@models/search-item/search-item';
import { WeatherHistoryService } from '@services/weather-history.service';
import { FORECAST } from '@store/app-config';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherItems: WeatherItem;
  searchHistoryItems: SearchItem[] = [];
  showItems: boolean;
  currentPeriod: number;

  constructor(
    private weatherService: WeatherService,
    private weatherHistoryService: WeatherHistoryService
  ) {}

  ngOnInit() {
    this.weatherHistoryService.initSearchHistoryItems();
    this.searchHistoryItems = this.weatherHistoryService.getSearchHistoryItems();
  }

  checkIfDataFound(): boolean {
    return (
      this.weatherItems &&
      this.weatherItems.weatherData &&
      this.weatherItems.weatherData.length > 0
    );
  }

  getCurrentPeriod(): number {
    return this.weatherItems &&
      this.weatherItems.days
      ? this.weatherItems.days / FORECAST
      : 1;
  }

  async onSearched(searchItem: SearchItem) {
    if (searchItem.city.trim() === '') {
      this.weatherItems = undefined;
    } else {
      await this.weatherService
        .getWeatherItemsByCityName(searchItem.city, searchItem.days)
        .toPromise()
        .then(data => {
          this.weatherHistoryService.addSearchHistoryItem(
            new SearchItem(searchItem.id, searchItem.city, searchItem.days)
          );
          return (this.weatherItems = data);
        });
    }
    this.currentPeriod = this.getCurrentPeriod();
    this.showItems = this.checkIfDataFound();
  }

  onRepeatedSearch(searchItem: SearchItem) {
    this.weatherHistoryService.addSearchHistoryItem(searchItem);
    this.onSearched(searchItem);
  }

  onDeletedSearch(searchItem: SearchItem) {
    this.weatherHistoryService.deleteSearchHistoryItem(
      searchItem.id,
      searchItem.days
    );
  }
}
