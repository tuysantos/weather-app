import { createAction, props } from '@ngrx/store';
import { WeatherForeCast } from '../../model/weather';
import { HttpErrorResponse } from '@angular/common/http';

export class ForecastActions {
    public static getForecast = createAction(
        '[Forecast Page] Get Forecast',
        props<{ payload: number }>()
    );

    public static getForecastSuccess = createAction(
        '[Forecast API] Get Forecast Success',
        props<{ payload: WeatherForeCast }>()
    );

    public static getForecastFailure = createAction(
        '[Forecast API] Get Forecast Failure',
        props<{ error: HttpErrorResponse }>()
    );
}
