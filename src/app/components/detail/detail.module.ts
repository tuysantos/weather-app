import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {ForecastStoreReducer, reducer} from '../../store/forecast/forecast-store.reducer';
import {ForecastEffects} from '../../store/forecast/forecast-store.effects';
import {WeatherForecastContainerModule} from '../widgets/weather-forecast-container/weather-forecast-container.module';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    DetailRoutingModule,
    WeatherForecastContainerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    StoreModule.forFeature(ForecastStoreReducer.featureSelectorKey, reducer),
    EffectsModule.forFeature([ForecastEffects]),
  ],
  declarations: [DetailComponent]
})
export class DetailModule {}
