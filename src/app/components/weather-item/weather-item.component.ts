import { Component, OnInit, Input } from '@angular/core';
import { WeatherData } from '../../models/weather-data/weather-data';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input() weatherItem: WeatherData;

  ngOnInit() {}
}
