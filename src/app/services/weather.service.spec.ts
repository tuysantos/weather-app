import { inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { consolidated_weather } from '../model/mockData';
import { WeatherForeCast } from '../model/weather';
import { environment } from '../../environments/environment';
import { LocationType } from '../model/location';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  const weatherForecastMock: WeatherForeCast = {
    consolidated_weather,
    title: 'London',
    location_type: 'city',
    woeid: 12345,
    latt_long: '',
    timezone: '',
  };

  const locationMock: LocationType[] = [
    {
      title: 'London',
      location_type: 'city',
      woeid: 54321,
      latt_long: ''
    },
    {
      title: 'Lome',
      location_type: 'city',
      woeid: 22222,
      latt_long: ''
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WeatherService
      ]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Weather Detail ForeCast', inject([HttpTestingController, WeatherService],
    (httpMock: HttpTestingController, service: WeatherService) => {
      service.getWeatherDetailForeCast(1234).subscribe(data => {
        expect(data).toEqual(weatherForecastMock);
      });
      const req = httpMock.expectOne(`${environment.apiEndPoint}location/1234`);
      expect(req.request.method).toEqual('GET');
      req.flush(weatherForecastMock);
  }));

  it('should get Weather Detail ForeCast', inject([HttpTestingController, WeatherService],
    (httpMock: HttpTestingController, service: WeatherService) => {
      service.getWeatherByCityAndCountry('lon').subscribe(data => {
        expect(data).toEqual(locationMock);
      });
      const req = httpMock.expectOne(`${environment.apiEndPoint}location/search/?query=lon`);
      expect(req.request.method).toEqual('GET');
      req.flush(locationMock);
  }));
});
