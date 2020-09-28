import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { LocationsFacade } from './location-store.facade';
import { LocationsActions } from './location-store.actions';
import { LocationsStoreState } from './location-store.reducer';

describe('LocationsFacade', () => {
    let facade: LocationsFacade;
    let store: MockStore<LocationsStoreState>;

    let spectator: SpectatorService<LocationsFacade>;
    const createService = createServiceFactory({
        service: LocationsFacade,
        providers: [provideMockStore({})],
    });

    beforeEach(() => {
        spectator = createService();
        facade = spectator.inject(LocationsFacade);
        store = spectator.get<MockStore<LocationsStoreState>>(Store);
        spyOn(store, 'dispatch');
    });

    it('should getForecast', () => {
        facade.searchLocations('lon');
        const action = LocationsActions.searchLocation({ payload: 'lon' });
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
});
