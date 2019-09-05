import { TestBed } from '@angular/core/testing';

import { WeatherHistoryService } from './weather-history.service';

describe('WeatherHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherHistoryService = TestBed.get(WeatherHistoryService);
    expect(service).toBeTruthy();
  });
});
