import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ForecastEffects } from './forecast-store.effects';
import { ForecastStoreReducer } from './forecast-store.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(ForecastStoreReducer.featureSelectorKey, ForecastStoreReducer.reducer),
        EffectsModule.forFeature([ForecastEffects]),
    ],
})

export class ForecastStoreModule {}
