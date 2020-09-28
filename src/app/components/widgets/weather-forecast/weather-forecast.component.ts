import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../../../model/forecast';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent implements OnInit {

  @Input() weatherData: Forecast;
  @Input() checkForMax = false;
  isMaximum = false;
  imgPath = '';
  constructor() { }

  ngOnInit(): void {
    if (this.weatherData) {
      this.formatWeatherData();
    }
  }

  formatWeatherData(): void {
    this.imgPath = `/assets/img/${this.weatherData.weather_state_abbr}.svg`;
    this.weatherData.applicable_date = this.formateDate(this.weatherData.applicable_date);
    this.weatherData.max_temp = Math.round(this.weatherData.max_temp);
    this.weatherData.min_temp = Math.round(this.weatherData.min_temp);
    this.isMaximum = this.weatherData.isMaxTemp;
  }

  formateDate(date: string): string {
    const temp = new Date(date);
    const dd =  String(temp.getDate()).padStart(2, '0');
    const mm = String(temp.getMonth() + 1).padStart(2, '0');
    const yyyy = temp.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
}
