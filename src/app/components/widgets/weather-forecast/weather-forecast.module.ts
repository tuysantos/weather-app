
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {WeatherForecastComponent} from './weather-forecast.component';

@NgModule({
declarations: [WeatherForecastComponent],
imports: [ CommonModule ],
entryComponents: [WeatherForecastComponent],
exports: [WeatherForecastComponent],
})
export class WeatherForecastModule {}
