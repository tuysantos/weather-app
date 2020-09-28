
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WeatherForecastModule } from '../weather-forecast/weather-forecast.module';
import {WeatherForecastContainerComponent} from './weather-forecast-container.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
declarations: [WeatherForecastContainerComponent],
imports: [ CommonModule, WeatherForecastModule, MatButtonModule ],
entryComponents: [WeatherForecastContainerComponent],
exports: [WeatherForecastContainerComponent],
})
export class WeatherForecastContainerModule {}
