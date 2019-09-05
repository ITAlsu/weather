import { Component, OnInit, Input } from '@angular/core';
import { WeatherItem } from './weather-item';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input() weatherItem: WeatherItem;
  // weatherItem: WeatherItem = {
  //   cityName: "Shuzenji",
  //   id: 1851632,
  //   country: "JP",
  //   temper: 15,
  //   icon:  "02d"
  // };

  constructor() {
    //this.weatherItem = new WeatherItem("Shuzenji", 1851632, "JP", 15, "01n" );
  }

  ngOnInit() {

  }

}
