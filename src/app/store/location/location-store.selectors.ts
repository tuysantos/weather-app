import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationsStoreReducer, LocationsStoreState } from './location-store.reducer';

export class LocationsSelectors {
    private static locationState = createFeatureSelector(LocationsStoreReducer.featureSelectorKey);

    public static locations = createSelector(
        LocationsSelectors.locationState,
        (state: LocationsStoreState) => (state ? state.locations : null)
    );

    public static error = createSelector(
        LocationsSelectors.locationState,
        (state: LocationsStoreState) => (state ? state.error : null)
    );

    public static apiState = createSelector(
        LocationsSelectors.locationState,
        (state: LocationsStoreState) => (state ? state.apiState : null)
    );
}
