import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherItem } from '../../models/weather-item/weather-item';
import { WeatherService } from '../../services/weather.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SearchItem } from 'src/app/models/search-item/search-item';
import { WeatherHistoryService } from 'src/app/services/weather-history.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {
  weatherItems: WeatherItem;
  searchHistoryItems: SearchItem[] = [] ;
  private searchTerms = new Subject<string>();

  constructor(private weatherService: WeatherService,
              private weatherHistoryService: WeatherHistoryService) {}

  ngOnInit() {
    // show weather item after successful search
    this.searchTerms
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term: string) =>
          this.weatherService.getWeatherItemsByCityName(term)
        )
      )
      .subscribe(
        data => {
          this.searchHistoryItems = this.weatherHistoryService.getSearchHistoryItems();
          return this.weatherItems = data;
        }
      );

    this.weatherHistoryService.initSearchHistoryItems();
    this.searchHistoryItems = this.weatherHistoryService.getSearchHistoryItems();
  }

  onSearchedDays(searchItem: SearchItem) {
    this.weatherService
      .getWeatherItemsByCityName(searchItem.city, searchItem.days)
      .subscribe(
        data => {
          return (this.weatherItems = data);
        }
      );
  }

  onRepeatedSearch(searchItem: SearchItem) {
    this.weatherHistoryService.addSearchHistoryItem(searchItem);
    this.onSearchedDays(searchItem);
  }

  onDeletedSearch(searchItem: SearchItem) {
    this.weatherHistoryService.deleteSearchHistoryItem(searchItem.id, searchItem.days);
  }

  ngOnDestroy() {
    this.searchTerms.next();
    this.searchTerms.complete();
  }
}
