import { WeatherData } from '../weather-data/weather-data';
import { IWeatherItem } from './iweather-item';
import { AVERAGE_TEMP_HOURS } from '../../store/app-config';

export class WeatherItem implements IWeatherItem {
  id: number;
  cityName: string;
  country: string;
  days: number;
  weatherData: WeatherData[];

  constructor(
    id: number,
    cityName: string,
    country: string,
    days: number,
    weatherData: WeatherData[]
  ) {
    this.id = id;
    this.cityName = cityName;
    this.country = country;
    this.days = days;
    this.weatherData = this.filterCurrentDate(weatherData);
  }

  filterCurrentDate(unfilteredWeatherData: any[]): WeatherData[] {
    const filteredWeatherData: WeatherData[] = [];

    for (const element of unfilteredWeatherData) {
      if (new Date(+element.dt * 1000).getHours() === AVERAGE_TEMP_HOURS) {
        filteredWeatherData.push(
          new WeatherData(
            element.main.temp_min,
            element.main.temp_max,
            element.weather[0].icon,
            String(1000 * element.dt)
          )
        );
      }
    }
    return filteredWeatherData;
  }
}
