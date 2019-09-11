import { Injectable } from '@angular/core';
import { SearchItem } from '../models/search-item/search-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherHistoryService {
  MAX_HISTORY = 10;
  searchSubject: Subject<SearchItem> = new Subject<SearchItem>();
  historyItems: SearchItem[];

  constructor() { }

  addSearchHistoryItem(searchItem: SearchItem) {
    this.deleteSearchHistoryItem(searchItem.id, searchItem.days);

    this.historyItems.push(searchItem);
    if (this.historyItems.length > this.MAX_HISTORY) {
      this.historyItems.shift();
    }

    localStorage.setItem('historyItems', JSON.stringify(this.historyItems));
    this.searchSubject.next(searchItem);
  }

  setSearchHistoryItems() {
    const storageData = JSON.parse(localStorage.getItem('historyItems'));
    this.historyItems = storageData ? storageData : [];
  }

  getSearchHistoryItems(): SearchItem[] {
    this.setSearchHistoryItems();
    return this.historyItems;
  }

  deleteSearchHistoryItem(id: number, days: number): void {
    this.setSearchHistoryItems();
    
    const index = this.historyItems.findIndex(x => x.id === id && x.days === days);
    if (index !== -1) {
      this.historyItems.splice(index, 1);
      localStorage.setItem('historyItems', JSON.stringify(this.historyItems));
    }
  }

}
