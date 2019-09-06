export class WeatherItem {
    cityName: string;
    id: number;
    days: number;
    country: string;
    temper_min: number;
    temper_max: number;
    icon: string ;
}
/*
{city: {id: 2355474, name: "Lon", coord: {lat: 11.4489, lon: -2.13}, country: "BF", population: 169834,…}
coord: {lat: 11.4489, lon: -2.13}
lat: 11.4489
lon: -2.13
country: "BF"
id: 2355474
name: "Lon"
population: 169834
sunrise: 1567749509
sunset: 1567793758
timezone: 0
cnt: 1
cod: "200"
list: [{dt: 1567771200,…}]
0: {dt: 1567771200,…}
clouds: {all: 9}
all: 9
dt: 1567771200
dt_txt: "2019-09-06 12:00:00"
main: {temp: 32.01, temp_min: 32.01, temp_max: 32.01, pressure: 1012.74, sea_level: 1012.74,…}
grnd_level: 978.81
humidity: 55
pressure: 1012.74
sea_level: 1012.74
temp: 32.01
temp_kf: 0
temp_max: 32.01
temp_min: 32.01
sys: {pod: "d"}
pod: "d"
weather: [{id: 800, main: "Clear", description: "clear sky", icon: "01d"}]
0: {id: 800, main: "Clear", description: "clear sky", icon: "01d"}
description: "clear sky"
icon: "01d"
id: 800
main: "Clear"
wind: {speed: 2.81, deg: 192.022}
deg: 192.022
speed: 2.81
message: 0.006
        */
