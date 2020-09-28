import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiState } from 'src/app/model/api.satets';
import { WeatherForeCast } from 'src/app/model/weather';
import { ForecastFacade } from 'src/app/store/forecast/forecast-store.facade';
import { DetailComponent } from './detail.component';
import { consolidated_weather } from '../../model/mockData';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let forecastFacade: ForecastFacade;

  const city: WeatherForeCast = {
    consolidated_weather,
    title: 'London',
    location_type: 'city',
    woeid: 12345,
    latt_long: '',
    timezone: '',
  };

  class ForecastFacadeMock {
    apiState$ = of(ApiState.Done);
    forecast$ = of(city);
    getForecast(woeid: number): void {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComponent ],
      providers: [
        { provide: ForecastFacade, useClass: ForecastFacadeMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap( { id: '1234'})}} },
        {provide: MatSnackBar, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    forecastFacade = TestBed.inject(ForecastFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load Forecast', () => {
    spyOn(forecastFacade, 'getForecast');
    component.loadForecast();
    expect(forecastFacade.getForecast).toHaveBeenCalled();
  });

  it('should populate city', () => {
    component.ngOnInit();
    expect(component.city.woeid).toEqual(12345);
  });
});
