import { Injectable, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ForecastSelectors } from './forecast-store.selectors';
import { ForecastActions } from './forecast-store.actions';
import { ForecastStoreState } from './forecast-store.reducer';

@Injectable({ providedIn: 'root' })
export class ForecastFacade {
    public forecast$ = this.store.select(ForecastSelectors.forecast);
    public error$ = this.store.pipe(select(ForecastSelectors.error));
    public apiState$ = this.store.pipe(select(ForecastSelectors.apiState));

    constructor(private store: Store<ForecastStoreState>) {}

    getForecast(woeid: number): void {
        this.store.dispatch(ForecastActions.getForecast({ payload: woeid }));
    }
}
