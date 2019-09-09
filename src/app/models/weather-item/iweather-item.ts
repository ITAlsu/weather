import { WeatherData } from '../weather-data/weather-data';

export interface IWeatherItem {
    id: number;
    cityName: string;
    country: string;
    days: number;
    weaterData: WeatherData[];

}