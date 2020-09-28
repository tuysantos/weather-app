import { Action, createReducer, on } from '@ngrx/store';
import { ApiState } from '../../model/api.satets';
import { HttpErrorResponse } from '@angular/common/http';
import { WeatherForeCast } from '../../model/weather';
import { ComparationActions } from './comparation-store.actions';

export interface ComparationStoreState {
    comparation: WeatherForeCast[];
    count: number;
    apiState: ApiState;
    error: HttpErrorResponse;
}

const initialState: ComparationStoreState = {
    comparation: [],
    count: 0,
    apiState: ApiState.Init,
    error: null,
};

export class ComparationStoreReducer {
    public static featureSelectorKey = 'comparation';

    public static reducer = createReducer(
        initialState,
        on(ComparationActions.loadComparation, (state, _) => ({
            ...state,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(ComparationActions.loadComparationSuccess, (state, _) => ({
            ...state,
            apiState: ApiState.Done,
            error: null,
        })),
        on(ComparationActions.addComparation, (state, {payload}) => ({
            ...state,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(ComparationActions.addComparationSuccess, (state, { payload }) => ({
            ...state,
            comparation: [...state.comparation, payload],
            count: state.comparation.length + 1,
            apiState: ApiState.Done,
            error: null,
        })),
        on(ComparationActions.addComparationFailure, (state, { error }) => ({
                ...state,
                apiState: ApiState.Error,
                error,
            })
        ),
        on(ComparationActions.removeComparation, (state, { payload }) => ({
            ...state,
            comparation: [...state.comparation.filter(item => item.woeid !== payload)],
            count: state.comparation.length - 1,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(ComparationActions.removeAllComparation, (state, _) => ({
            ...state,
            comparation: [],
            count: 0,
            apiState: ApiState.Pending,
            error: null,
        })),
        on(ComparationActions.removeSuccess, (state, _) => ({
            ...state,
            apiState: ApiState.Done,
            error: null,
        })),
    );
}

// tslint:disable-next-line: typedef
export function reducer(state: ComparationStoreState, action: Action) {
    return ComparationStoreReducer.reducer(state, action);
}
