export class WeatherData {
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