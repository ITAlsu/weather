import { WeatherData } from '../weather-data/weather-data';
import { IWeatherItem } from './iweather-item';

const averageTemperatureHours = 15; // 15:00
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

  // crutch : API returns only weather for max 5 day / 3 hour forecast each
  // to get the averaged temperature for more than 1 day - is not for FREE =(
  // here we take only 15:00 weather info as if it is an averaged temperature
  // 24h every / 3 hour = 8 results, so Api returns 8 results per day. We take the one with time 15:00
  filterCurrentDate(unfilteredWeatherData: any[]): WeatherData[] {
    const filteredWeatherData: WeatherData[] = [];

    for (const element of unfilteredWeatherData) {
      // crutch : API returns only weather for 5 day / 3 hour forecast
      // here we take only 15:00 weather info
      if (new Date(+element.dt * 1000).getHours() === averageTemperatureHours) {
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
