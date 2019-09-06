import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { SearchItem } from './searchItem';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  searchHistoryItems : SearchItem[];
  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.searchHistoryItems = this._weatherService.getSearchHistoryItems();
  }
  
  doIt(){
    console.log('wooooorks');
  }
  
  
}
