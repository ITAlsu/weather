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

  constructor() {}

  addSearchHistoryItem(searchItem: SearchItem) {
    this.deleteFromStorageData(searchItem.id, searchItem.days);

    this.historyItems.push(searchItem);
    if (this.historyItems.length > this.MAX_HISTORY) {
      this.historyItems.shift();
    }

    this.uploadSearchHistoryItems();
    this.searchSubject.next(searchItem);
  }

  initSearchHistoryItems() {
    const storageData = JSON.parse(localStorage.getItem('historyItems'));
    this.historyItems = storageData ? storageData : [];
  }

  uploadSearchHistoryItems() {
    localStorage.setItem('historyItems', JSON.stringify(this.historyItems));
  }

  getSearchHistoryItems(): SearchItem[] {
    return this.historyItems;
  }

  deleteFromStorageData(id: number, days: number): void {
    const index = this.historyItems.findIndex(
      x => x.id === id && x.days === days
    );

    if (index !== -1) {
      this.historyItems.splice(index, 1);
    }
  }

  deleteSearchHistoryItem(id: number, days: number): void {
    this.deleteFromStorageData(id, days);
    this.uploadSearchHistoryItems();
  }
}
