import { Action, createReducer, on } from '@ngrx/store';
import { ForecastActions } from './forecast-store.actions';
import { ApiState } from '../../model/api.satets';
import { HttpErrorResponse } from '@angular/common/http';
import { WeatherForeCast } from '../../model/weather';

export interface ForecastStoreState {
    weatherForecast: WeatherForeCast;
    apiState: ApiState;
    error: HttpErrorResponse;
}

const initialState: ForecastStoreState = {
    weatherForecast: null,
    apiState: ApiState.Init,
    error: null,
};

export class ForecastStoreReducer {
    public static featureSelectorKey = 'forecast';

    public static reducer = createReducer(
        initialState,
        on(ForecastActions.getForecast, (state, _) => ({
            ...state,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(ForecastActions.getForecastSuccess, (state, { payload }) => ({
            ...state,
            weatherForecast: payload,
            apiState: ApiState.Done,
            error: null,
        })),
        on(
            ForecastActions.getForecastFailure,
            (state, { error }) => ({
                ...state,
                apiState: ApiState.Error,
                error,
            })
        ),
    );
}

// tslint:disable-next-line: typedef
export function reducer(state: ForecastStoreState, action: Action) {
    return ForecastStoreReducer.reducer(state, action);
}
