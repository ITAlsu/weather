import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherItem } from 'src/app/models/weather-item/weather-item';
import { of } from 'rxjs';
import { WeatherData } from 'src/app/models/weather-data/weather-data';
import { WeatherService } from 'src/app/services/weather.service';
import { SearchItem } from 'src/app/models/search-item/search-item';


describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should get weather data', () => {
    const weatherItem = new WeatherItem(1, 'London', 'UK', 1, [new WeatherData(-1, 1, '01d', '')] );
    let weatherService: WeatherService;

    spyOn(weatherService, 'getWeatherItemsByCityName').and.callFake(() => {
      return of(weatherItem);
    });

    component.onSearched( new SearchItem(1, 'London', 1));

    expect(component.weatherItems).toEqual(weatherItem);
  });

  it('should create WeatherComponent', () => {
    expect(component).toBeTruthy();
  });
});
