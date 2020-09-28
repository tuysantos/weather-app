import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchModule } from '../search/search.module';
import {MainComponent} from './main.component';
import {LocationListModule} from '../location-list/location-list.module';
import {LocationsStoreModule, LocationsStoreReducer, reducer} from '../../store/location';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LocationsEffects } from '../../store/location/location-store.effects';
import {ComparationStoreModule} from '../../store/comparation/comparation-store.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
declarations: [MainComponent],
imports: [ CommonModule, SearchModule, LocationListModule, LocationsStoreModule, ComparationStoreModule, MatSnackBarModule,
    StoreModule.forFeature(LocationsStoreReducer.featureSelectorKey, reducer),
    EffectsModule.forFeature([LocationsEffects]), ],
})
export class MainModule {}
