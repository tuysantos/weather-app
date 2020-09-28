import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ForecastStoreReducer, ForecastStoreState } from './forecast-store.reducer';

export class ForecastSelectors {
    private static forecastState = createFeatureSelector(ForecastStoreReducer.featureSelectorKey);

    public static forecast = createSelector(
        ForecastSelectors.forecastState,
        (state: ForecastStoreState) => (state ? state.weatherForecast : null)
    );

    public static error = createSelector(
        ForecastSelectors.forecastState,
        (state: ForecastStoreState) => (state ? state.error : null)
    );

    public static apiState = createSelector(
        ForecastSelectors.forecastState,
        (state: ForecastStoreState) => (state ? state.apiState : null)
    );
}
