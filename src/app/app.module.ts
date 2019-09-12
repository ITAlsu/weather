import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SearchCityComponent } from './components/search-city/search-city.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { WeatherComponent } from './components/weather/weather.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    SearchHistoryComponent,
    SearchCityComponent,
    WeatherItemComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
