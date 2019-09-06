import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WeatherGridComponent } from './weather-grid/weather-grid.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { FormsModule } from '@angular/forms';
import { SearchCityComponent } from './search-city/search-city.component';
import { WeatherItemComponent } from './weather-item/weather-item.component';

import { HttpClientModule }    from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WeatherGridComponent,
    SearchHistoryComponent,
    SearchCityComponent,
    WeatherItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
