import { Action, createReducer, on } from '@ngrx/store';
import { LocationsActions } from './location-store.actions';
import { ApiState } from '../../model/api.satets';
import { HttpErrorResponse } from '@angular/common/http';
import { LocationType } from '../../model/location';

export interface LocationsStoreState {
    locations: LocationType[];
    apiState: ApiState;
    error: HttpErrorResponse;
}

const initialState: LocationsStoreState = {
    locations: [],
    apiState: ApiState.Init,
    error: null,
};

export class LocationsStoreReducer {
    public static featureSelectorKey = 'locations';

    public static reducer = createReducer(
        initialState,
        on(LocationsActions.searchLocation, (state, _) => ({
            ...state,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(LocationsActions.searchLocationSuccess, (state, { payload }) => ({
            ...state,
            locations: payload,
            apiState: ApiState.Done,
            error: null,
        })),
        on(
            LocationsActions.searchLocationFailure,
            (state, { error }) => ({
                ...state,
                apiState: ApiState.Error,
                error,
            })
        ),
    );
}

// tslint:disable-next-line: typedef
export function reducer(state: LocationsStoreState, action: Action) {
    return LocationsStoreReducer.reducer(state, action);
}
