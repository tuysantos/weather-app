import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherForeCast } from '../../../model/weather';
import { ApiState } from '../../../model/api.satets';
import { ComparationFacade } from '../../../store/comparation/comparation-store.facade';
import { WeatherForecastContainerComponent } from './weather-forecast-container.component';
import { consolidated_weather } from '../../../model/mockData';

describe('WeatherForecastContainerComponent', () => {
  let component: WeatherForecastContainerComponent;
  let fixture: ComponentFixture<WeatherForecastContainerComponent>;
  let comparationFacade: ComparationFacade;

  const cities: WeatherForeCast[] = [{
    consolidated_weather,
    title: 'London',
    location_type: 'city',
    woeid: 12345,
    latt_long: '',
    timezone: '',
  }];

  class ComparationFacadeMock {
    apiState$ = of(ApiState.Done);
    count$ = of(2);
    comparation$ = of(cities);

    addToComparation(woeid: number): void {}
    removeFromComparation(woeid: number): void {}
    loadComparation(): void {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherForecastContainerComponent ],
      providers: [
        { provide: ComparationFacade, useClass: ComparationFacadeMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastContainerComponent);
    comparationFacade =  TestBed.inject(ComparationFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should build Weather Forecast', () => {
    component._location = {
      time: '2020-09-27T04:07:28.739025+02:00',
      timezone: 'Europe/Madrid',
      title: 'Barcelona',
      woeid: 753692,
      latt_long: '41.385578,2.168740',
      location_type: 'City',
      consolidated_weather: [
        {
          id: 324423,
          applicable_date: '2020-09-26',
          max_temp: 20.915,
          min_temp: 14.955,
          the_temp: 20.494999999999997,
          weather_state_abbr: 's',
          weather_state_name: 'Showers',
        },
        {
          id: 76867867,
          applicable_date: '2020-09-27',
          max_temp: 15.915,
          min_temp: 10.955,
          the_temp: 19.494999999999997,
          weather_state_abbr: 's',
          weather_state_name: 'Showers',
        }


      ]
    };

    component.buildWeatherForecast();
    expect(component.title).toEqual('Barcelona');
    expect(component.timezone).toEqual('Europe/Madrid');
    expect(component.time).toEqual('04:07');
    expect(component.locationType).toEqual('City');
  });

  it('should get Local Time', () => {
    const time = '2020-09-27T04:07:28.739025+02:00';
    const result = component.getLocalTime(time);
    expect(result).toEqual('04:07');
  });

  it('should remove item', () => {
    spyOn(comparationFacade, 'removeFromComparation');
    component.removeItem(123);
    expect(comparationFacade.removeFromComparation).toHaveBeenCalledWith(123);
  });
});
