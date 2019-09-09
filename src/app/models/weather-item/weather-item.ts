import { WeatherData } from '../weather-data/weather-data';
import { IWeatherItem } from './iweather-item';

export class WeatherItem implements IWeatherItem{
    id: number;
    cityName: string;
    country: string;
    days: number;
    weaterData: WeatherData[];

    constructor(id: number, cityName: string, country: string, days: number,
                weaterData: WeatherData[]) {
        this.id = id;
        this.cityName = cityName;
        this.country = country;
        this.days  = days;
        this.weaterData = weaterData;
    }
}
