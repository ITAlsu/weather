import { WeatherService } from './weather.service';
import {
  TestBed,
  async,
  inject,
  fakeAsync,
  tick,
  getTestBed
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { API_ENDPOINT, KEY, FORECAST } from '../store/app-config';

describe('WeatherService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
  }));

  it('should return an Observable<any>', fakeAsync(
    inject(
      [WeatherService, HttpTestingController],
      (weatherService: WeatherService, backend: HttpTestingController) => {
        // Set up
        const cityName = 'London';
        const days = 1;
        const url = `${API_ENDPOINT}${cityName}&APPID=${KEY}&units=metric&cnt=${days *
          FORECAST}`;
        const responseObject = {
          cnt: 1,
          list: [
            {
              dt: 1568829600,
              main: {
                temp_min: 15.72,
                temp_max: 16.24
              },
              weather: [
                {
                  icon: '01d'
                }
              ]
            }
          ],
          city: {
            id: 2643743,
            name: 'London',
            country: 'GB'
          }
        };

        let response = null;

        weatherService.getWeatherItemsByCityName(cityName, days).subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );

        const requestWrapper = backend.expectOne({
          url: `${API_ENDPOINT}${cityName}&APPID=${KEY}&units=metric&cnt=${days *
            FORECAST}`
        });

        requestWrapper.flush(responseObject);

        tick();

        expect(requestWrapper.request.method).toEqual('GET');
        expect(response.cityName).toBe('London');
      }
    )
  ));

  it('should be initialized', inject(
    [WeatherService],
    (weatherService: WeatherService) => {
      expect(weatherService).toBeTruthy();
    }
  ));
});
