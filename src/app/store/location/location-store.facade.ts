import { Injectable, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LocationsSelectors } from './location-store.selectors';
import { LocationsStoreState } from './location-store.reducer';
import { LocationsActions } from './location-store.actions';

@Injectable({ providedIn: 'root' })
export class LocationsFacade {
    public locations$ = this.store.select(LocationsSelectors.locations);
    public error$ = this.store.pipe(select(LocationsSelectors.error));
    public apiState$ = this.store.pipe(select(LocationsSelectors.apiState));

    constructor(private store: Store<LocationsStoreState>) {}

    searchLocations(query: string): void {
        this.store.dispatch(LocationsActions.searchLocation({ payload: query }));
    }
}
