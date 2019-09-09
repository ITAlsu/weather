import { Injectable } from '@angular/core';
import { SearchItem } from '../models/search-item/search-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherHistoryService {
  MAX_HISTORY = 3;
  searchSubject : Subject<SearchItem> = new Subject<SearchItem>();
  constructor() { }

  addSearchHistoryItem(searchItem: SearchItem){
    let historyItems = this.getSearchHistoryItems()? this.getSearchHistoryItems(): [];

    historyItems.push(searchItem);
    if (historyItems.length > this.MAX_HISTORY) 
    {
       historyItems.shift();
    }
    localStorage.setItem("historyItems", JSON.stringify(historyItems));
    this.searchSubject.next(searchItem);
  }

  getSearchHistoryItems(): SearchItem[] {
    return JSON.parse(localStorage.getItem("historyItems"));
  }

  deleteSearchHistoryItem(id: number): void {
    let historyItems = this.getSearchHistoryItems();
    var index = historyItems.map(x => {
      return x.id;
    }).indexOf(id);

    historyItems.splice(index, 1);
    localStorage.setItem("historyItems", JSON.stringify(historyItems));
  }
}
