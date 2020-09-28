import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { ComparationFacade } from './comparation-store.facade';
import { ComparationActions } from './comparation-store.actions';
import { ComparationStoreState } from './comparation-store.reducer';

describe('ComparationFacade', () => {
    let facade: ComparationFacade;
    let store: MockStore<ComparationStoreState>;

    let spectator: SpectatorService<ComparationFacade>;
    const createService = createServiceFactory({
        service: ComparationFacade,
        providers: [provideMockStore({})],
    });

    beforeEach(() => {
        spectator = createService();
        facade = spectator.inject(ComparationFacade);
        store = spectator.get<MockStore<ComparationStoreState>>(Store);
        spyOn(store, 'dispatch');
    });

    it('should loadComparation', () => {
        facade.loadComparation();
        const action = ComparationActions.loadComparation();
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should addComparation', () => {
        const woeid = 1234;
        facade.addToComparation(woeid);
        const action = ComparationActions.addComparation({ payload: woeid });
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should removeComparation', () => {
        const woeid = 1234;
        facade.removeFromComparation(woeid);
        const action = ComparationActions.removeComparation({ payload: woeid });
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should remove all Comparation', () => {
        facade.removeAllFromComparation();
        const action = ComparationActions.removeAllComparation();
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
});
