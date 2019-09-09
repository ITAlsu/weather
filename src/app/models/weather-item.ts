import { WeatherData } from './weather-data';

export class WeatherItem {
    constructor(public id: number,
                public cityName: string,
                public country: string,
                public days: number,
                public weaterData: WeatherData[]
                ) {

    }
}
