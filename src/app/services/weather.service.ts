import { WeatherItem } from '../weather-item/weather-item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SearchItem } from '../search-history/searchItem';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = "http://api.openweathermap.org/data/2.5/forecast?q=";  
  KEY ="3be1d5e2239f3863fd54b5b254c32256";

  constructor(private _http: HttpClient) {}

  getWeatherItemsByCityName(cityName: string, days = 1): Observable<any[]> {
    if (!cityName.trim()) {
      return of([]);
    }
    this.addSearchHistoryItem(cityName, days);

    return this._http.get<any[]>(`${this.url}${cityName}&APPID=${this.KEY}&units=metric&cnt=${days}`).pipe(
      tap(_ => console.log('545646564654646546546564564')),
      catchError(this.handleError<any[]>('searchCity', []))
    );
  }

  addSearchHistoryItem(city: string, days: number){
    let historyItems: SearchItem[];
    let storedHistory = JSON.parse(localStorage.getItem("historyItems"));
    historyItems = storedHistory? storedHistory :[];

    let historyItem: SearchItem = {city: city, days: days};
    historyItems.push(historyItem);
    if (historyItems.length > 3) 
    {
       historyItems.shift();
    }
    localStorage.setItem("historyItems", JSON.stringify(historyItems));
  }

  getSearchHistoryItems(): SearchItem[] {
    return JSON.parse(localStorage.getItem("historyItems"));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
