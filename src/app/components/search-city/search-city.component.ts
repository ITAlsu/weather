import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SearchPeriod } from './search-period';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit {
  @Input() cityName: string;
  @Input() currentPeriod: number;
  @Output() searched = new EventEmitter<any>();
  SearchPeriod = SearchPeriod;

  constructor() {}

  ngOnInit() {}

  onSearch(city: string, days: number = 1) {
    this.searched.emit({ city, days });
  }
}
