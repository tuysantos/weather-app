import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocationsEffects } from './location-store.effects';
import { LocationsStoreReducer } from './location-store.reducer';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(LocationsStoreReducer.featureSelectorKey, LocationsStoreReducer.reducer),
        EffectsModule.forFeature([LocationsEffects]),
    ],
})

export class LocationsStoreModule {}
