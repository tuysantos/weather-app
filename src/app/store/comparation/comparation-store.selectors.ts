import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ComparationStoreReducer, ComparationStoreState } from './comparation-store.reducer';

export class ComparationSelectors {
    private static comparationState = createFeatureSelector(ComparationStoreReducer.featureSelectorKey);

    public static comparation = createSelector(
        ComparationSelectors.comparationState,
        (state: ComparationStoreState) => (state ? state.comparation : null)
    );

    public static count = createSelector(
        ComparationSelectors.comparationState,
        (state: ComparationStoreState) => (state ? state.count : null)
    );

    public static error = createSelector(
        ComparationSelectors.comparationState,
        (state: ComparationStoreState) => (state ? state.error : null)
    );

    public static apiState = createSelector(
        ComparationSelectors.comparationState,
        (state: ComparationStoreState) => (state ? state.apiState : null)
    );
}
