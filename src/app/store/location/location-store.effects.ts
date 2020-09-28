import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { LocationsActions } from './location-store.actions';
import { WeatherService } from '../../services/weather.service';

@Injectable()
export class LocationsEffects {
    @Effect()
    searchLocations$: Observable<Action> = this.actions$.pipe(
        ofType(LocationsActions.searchLocation),
        switchMap((action) => {
            return this.weatherService.getWeatherByCityAndCountry(action.payload).pipe(
                map(locations => LocationsActions.searchLocationSuccess({ payload: locations })),
                catchError(error => of(LocationsActions.searchLocationFailure({ error })))
            );
        })
    );

    constructor(
        private actions$: Actions,
        private weatherService: WeatherService,
    ) {}
}
