import { IWeatherData } from './iweather-data';

export class WeatherData implements IWeatherData {
    temperMin: number;
    temperMax: number;
    icon: string;

    constructor(temperMin: number,
                temperMax: number,
                icon: string ) {
        this.temperMin = temperMin;
        this.temperMax = temperMax;
        this.icon = icon;
    }
}
