import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { PeriodComponent } from './period/period.component';
import { WeatherGridComponent } from './weather-grid/weather-grid.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    PeriodComponent,
    WeatherGridComponent,
    SearchHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
