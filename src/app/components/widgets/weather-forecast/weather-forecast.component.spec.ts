import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherForecastComponent } from './weather-forecast.component';

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format Weather Date', () => {
    component.weatherData = {
      id: 12345,
      applicable_date: '2020-09-26',
      max_temp: 31.857,
      min_temp: 18.15,
      the_temp: 29.105,
      weather_state_abbr: 'lc',
      weather_state_name: 'Light Cloud'
    };
    component.formatWeatherData();
    expect(component.imgPath).toEqual('/assets/img/lc.svg');
    expect(component.weatherData.applicable_date).toEqual('26/09/2020');
    expect(component.weatherData.max_temp).toEqual(32);
    expect(component.weatherData.min_temp).toEqual(18);
  });

  it('should formate Date', () => {
    const result = component.formateDate('2020-09-27');
    expect(result).toEqual('27/09/2020');
  });
});
