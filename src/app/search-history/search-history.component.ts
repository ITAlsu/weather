import { Component, OnInit } from '@angular/core';
import { SearchItem } from '../models/search-item/search-item';
import { WeatherHistoryService } from '../services/weather-history.service';
import { Subscription } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  searchHistoryItems : SearchItem[];
  searchHistoryItem : SearchItem;
  constructor(private _weatherHistoryService: WeatherHistoryService) { }

  ngOnInit() {
    this._weatherHistoryService.searchSubject.subscribe(data => {
      this.getSearchHistoryItems();
      return this.searchHistoryItem = data;
      },
      error => console.warn(error)
      );
    this.getSearchHistoryItems();
  }
  
  getSearchHistoryItems(){
    this.searchHistoryItems = this._weatherHistoryService.getSearchHistoryItems();
  }

  deleteSearchHistoryItem(id: number){
    this._weatherHistoryService.deleteSearchHistoryItem(id);
    this.getSearchHistoryItems();
  }
  
}
