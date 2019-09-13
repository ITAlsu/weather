import { Injectable } from '@angular/core';
import { SearchItem } from '../models/search-item/search-item';
import { MAX_HISTORY } from '../store/app-config';

@Injectable({
  providedIn: 'root'
})
export class WeatherHistoryService {
  private historyItems: SearchItem[];

  constructor() {}

  initSearchHistoryItems() {
    const storageData = JSON.parse(localStorage.getItem('historyItems'));
    this.historyItems = storageData ? storageData : [];
  }

  getSearchHistoryItems(): SearchItem[] {
    return this.historyItems;
  }

  setSearchHistoryItems() {
    localStorage.setItem('historyItems', JSON.stringify(this.historyItems));
  }

  addSearchHistoryItem(searchItem: SearchItem) {
    this.deleteLocally(searchItem.id, searchItem.days);

    this.historyItems.push(searchItem);
    if (this.historyItems.length > MAX_HISTORY) {
      this.historyItems.shift();
    }

    this.setSearchHistoryItems();
  }

  deleteLocally(id: number, days: number): void {
    const index = this.historyItems.findIndex(
      x => x.id === id && x.days === days
    );

    if (index !== -1) {
      this.historyItems.splice(index, 1);
    }
  }

  deleteSearchHistoryItem(id: number, days: number): void {
    this.deleteLocally(id, days);
    this.setSearchHistoryItems();
  }






}
