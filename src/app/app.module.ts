import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { FormsModule } from '@angular/forms';
import { SearchCityComponent } from './search-city/search-city.component';
import { WeatherItemComponent } from './weather-item/weather-item.component';
import { HttpClientModule }    from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


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
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
