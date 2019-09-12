import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchItem } from '../../models/search-item/search-item';
import { WeatherHistoryService } from '../../services/weather-history.service';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit, OnDestroy {
  searchHistoryItems: SearchItem[];
  searchHistoryItem: SearchItem;
  private subscription: Subscription;
  constructor(
    private weatherHistoryService: WeatherHistoryService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.weatherHistoryService.initSearchHistoryItems();

    this.subscription = this.weatherHistoryService.searchSubject.subscribe(
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

  getPeriodLabel(days: number): string {
    return (days === 1) ? 'today' : days + ' days';
  }

  getSearchHistoryItems() {
    this.searchHistoryItems = this.weatherHistoryService.getSearchHistoryItems();
  }

  deleteSearchHistoryItem(id: number, days: number) {
    this.weatherHistoryService.deleteSearchHistoryItem(id, days);
    this.getSearchHistoryItems();
  }

  repeatSearch(searchItem: SearchItem) {
    this.subscription.add(this.weatherService
      .getWeatherItemsByCityName(searchItem.city, searchItem.days)
      .subscribe(data => {
        this.weatherService.loadHistory(data);
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
