import { Injectable, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ComparationSelectors } from './comparation-store.selectors';
import { ComparationStoreState } from './comparation-store.reducer';
import { ComparationActions } from './comparation-store.actions';
import { ApiState } from 'src/app/model/api.satets';

@Injectable({ providedIn: 'root' })
export class ComparationFacade {
    public comparation$ = this.store.select(ComparationSelectors.comparation);
    public count$ = this.store.select(ComparationSelectors.count);
    public error$ = this.store.pipe(select(ComparationSelectors.error));
    public apiState$ = this.store.pipe(select(ComparationSelectors.apiState));

    constructor(private store: Store<ComparationStoreState>) {}

    addToComparation(woeid: number): void {
        this.store.dispatch(ComparationActions.addComparation({ payload: woeid }));
    }

    removeFromComparation(woeid: number): void {
        this.store.dispatch(ComparationActions.removeComparation({ payload: woeid }));
        this.apiState$.subscribe(state => {
            if (state === ApiState.Pending) {
                this.store.dispatch(ComparationActions.removeSuccess());
            }
        });
    }

    loadComparation(): void {
        this.store.dispatch(ComparationActions.loadComparation());
    }

    removeAllFromComparation(): void {
        this.store.dispatch(ComparationActions.removeAllComparation());
        this.apiState$.subscribe(state => {
            console.log('attempt', state);
            if (state === ApiState.Pending) {
                console.log('fired removeSuccess')
                this.store.dispatch(ComparationActions.removeSuccess());
            }
        });
    }
}
