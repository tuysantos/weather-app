import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { WeatherService } from '../../services/weather.service';
import { ForecastActions } from './forecast-store.actions';

@Injectable()
export class ForecastEffects {
    @Effect()
    getForecast$: Observable<Action> = this.actions$.pipe(
        ofType(ForecastActions.getForecast),
        switchMap((action) => {
            return this.weatherService.getWeatherDetailForeCast(action.payload).pipe(
                map(locations => ForecastActions.getForecastSuccess({ payload: locations })),
                catchError(error => of(ForecastActions.getForecastFailure({ error })))
            );
        })
    );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService,
    ) {}
}
