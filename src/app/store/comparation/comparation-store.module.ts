import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComparationStoreReducer } from './comparation-store.reducer';
import { ComparationEffects } from './comparation-store.effects';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(ComparationStoreReducer.featureSelectorKey, ComparationStoreReducer.reducer),
        EffectsModule.forFeature([ComparationEffects]),
    ],
})

export class ComparationStoreModule {}
