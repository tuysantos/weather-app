import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComparationComponent } from './weather-comparation.component';
import { WeatherComparationRoutingModule } from './weather-comparation-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {ComparationStoreReducer, reducer} from '../../store/comparation/comparation-store.reducer';
import {ComparationEffects} from '../../store/comparation/comparation-store.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { WeatherForecastContainerModule } from '../widgets/weather-forecast-container/weather-forecast-container.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    WeatherComparationRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    WeatherForecastContainerModule,
    MatIconModule,
    MatSnackBarModule,
    StoreModule.forFeature(ComparationStoreReducer.featureSelectorKey, reducer),
    EffectsModule.forFeature([ComparationEffects]),
  ],
  declarations: [WeatherComparationComponent]
})
export class WeatherComparationModule {}
