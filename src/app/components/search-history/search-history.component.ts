import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchItem } from '../../models/search-item/search-item';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  @Input() searchHistoryItems: SearchItem[];
  @Output() repeatSearch = new EventEmitter<SearchItem>();
  @Output() deleteSearch = new EventEmitter<SearchItem>();

  constructor() {}

  ngOnInit() {}

  onDeleteSearch(searchItem: SearchItem) {
    this.deleteSearch.emit(searchItem);
  }

  onRepeatSearch(searchItem: SearchItem) {
    this.repeatSearch.emit(searchItem);
  }
}
