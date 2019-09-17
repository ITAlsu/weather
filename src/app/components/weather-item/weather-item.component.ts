import { Component, OnInit, Input } from '@angular/core';
import { WeatherData } from '../../models/weather-data/weather-data';
import { API_IMG } from '../../store/app-config';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input() weatherItem: WeatherData;
  imgSrc = '';
  ngOnInit() {
    if (this.weatherItem) {
    this.imgSrc = API_IMG.replace('$', this.weatherItem.icon);
    }
  }
}
