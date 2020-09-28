import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WeatherDetail, WeatherForeCast } from '../../../model/weather';
import { Forecast } from '../../../model/forecast';
import { ComparationFacade } from 'src/app/store/comparation/comparation-store.facade';

@Component({
  selector: 'app-weather-forecast-container',
  templateUrl: './weather-forecast-container.component.html',
  styleUrls: ['./weather-forecast-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastContainerComponent implements OnInit {

  public isMaximum: false;
  public forecasts: Forecast[] = [];
  _location: WeatherForeCast;
  _maxWeatherForecats: WeatherDetail[] = [];
  public title = '';
  public timezone = '';
  public time = '';
  public locationType = '';
  public country = '';
  public woeid = 0;
  @Input() checkForMax = false;
  @Input('location') set location(value: WeatherForeCast) { this._location = value; }
  @Input('maxWeatherForecats') set maxWeatherForecats(value: WeatherDetail[]) { this._maxWeatherForecats = value; }

  constructor(private comparationFacade: ComparationFacade) { }

  ngOnInit(): void {
    this.buildWeatherForecast();
  }

  buildWeatherForecast(): void {
    if (this._location) {
      this.forecasts = [];
      this._location.consolidated_weather.forEach(item => {
        const data: Forecast = {...item};
        data.isMaxTemp = false;
        if (this._maxWeatherForecats && this._location.consolidated_weather.length > 1) {
          this._maxWeatherForecats.forEach(weather => {
            if (weather.id === data.id) {
              data.isMaxTemp = true;
            }
          });
        }
        this.forecasts.push(data);
      });

      this.title = this._location.title;
      this.timezone = this._location.timezone;
      this.time = this.getLocalTime(this._location.time);
      this.locationType = this._location.location_type;
      this.country = this._location.parent ? this._location.parent.title : '';
      this.woeid = this._location.woeid;
    }
  }

  getLocalTime(date: string): string {
    const temp = date.split('T');
    return `${temp[1].substring(0, 5)}`;
  }

  removeItem(id: number): void {
    this.comparationFacade.removeFromComparation(id);
  }
}
