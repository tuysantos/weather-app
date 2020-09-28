import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { ForecastFacade } from './forecast-store.facade';
import { ForecastActions } from './forecast-store.actions';
import { ForecastStoreState } from './forecast-store.reducer';

describe('ForecastFacade', () => {
    let facade: ForecastFacade;
    let store: MockStore<ForecastStoreState>;

    let spectator: SpectatorService<ForecastFacade>;
    const createService = createServiceFactory({
        service: ForecastFacade,
        providers: [provideMockStore({})],
    });

    beforeEach(() => {
        spectator = createService();
        facade = spectator.inject(ForecastFacade);
        store = spectator.get<MockStore<ForecastStoreState>>(Store);
        spyOn(store, 'dispatch');
    });

    it('should getForecast', () => {
        const woeid = 1234;
        facade.getForecast(woeid);
        const action = ForecastActions.getForecast({ payload: woeid });
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
});
