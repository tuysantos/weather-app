import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { WeatherService } from '../../services/weather.service';

import { HttpErrorResponse } from '@angular/common/http';
import { ComparationActions } from './comparation-store.actions';

@Injectable()
export class ComparationEffects {
    @Effect()
    getForecast$: Observable<Action> = this.actions$.pipe(
        ofType(ComparationActions.addComparation),
        switchMap((action) => {
            return this.weatherService.getWeatherDetailForeCast(action.payload).pipe(
                map(weatherForeCast => ComparationActions.addComparationSuccess({ payload: weatherForeCast })),
                catchError(error => of(ComparationActions.addComparationFailure({ error })))
            );
        })
    );

    loadComparation$: Observable<Action> = this.actions$.pipe(
        ofType(ComparationActions.loadComparation),
        tap(() => ComparationActions.loadComparationSuccess())
    );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService,
    ) {}
}
