import { async } from '@angular/core/testing';
import { iif, of, ReplaySubject, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocationsEffects } from './location-store.effects';
import { HttpErrorResponse } from '@angular/common/http';
import { WeatherService } from '../../services/weather.service';
import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { LocationsStoreState } from './location-store.reducer';
import { LocationType } from '../../model/location';
import { LocationsActions } from './location-store.actions';

const cities: LocationType[] = [{
    title: 'London',
    location_type: 'city',
    woeid: 54321,
    latt_long: ''
  }];

class WeatherServiceMock {
    // fail helper
    public fail = false;

    public getWeatherByCityAndCountry = (woeid: number) =>
        iif(
            () => this.fail,
            throwError(new HttpErrorResponse({ error: 'some error occured' })),
            of(cities)
        )
}

describe('LocationsEffects', () => {
    let service: SpyObject<WeatherServiceMock>;
    let effects: LocationsEffects;
    let actions: ReplaySubject<any>;
    let spectator: SpectatorService<LocationsEffects>;
    let store: SpyObject<Store<LocationsStoreState>>;

    const createService = createServiceFactory({
        service: LocationsEffects,
        providers: [
            provideMockActions(() => actions),
            {
                provide: WeatherService,
                useFactory: () => new WeatherServiceMock(),
            },
        ],
        imports: [HttpClientTestingModule],
        mocks: [Store],
    });

    beforeEach(() => {
        spectator = createService();
        effects = spectator.inject(LocationsEffects);
        service = spectator.get<WeatherServiceMock>(WeatherService);

        store = spectator.inject<Store<LocationsStoreState>>(Store);
        actions = new ReplaySubject(1);
    });

    it('getForecast$ should dispatch getForecastSuccess action', async(async () => {
        const action = LocationsActions.searchLocation({ payload: 'lon'});
        actions.next(action);
        effects.searchLocations$.subscribe(result => {
            expect(result.type).toEqual('[Location API] Search Locations Success');
        });
    }));

    it('getForecast$ should dispatch getForecastFailure action', async(async () => {
        service.fail = true;
        const action = LocationsActions.searchLocation({ payload: 'lon'});
        actions.next(action);
        effects.searchLocations$.subscribe(result => {
            expect(result.type).toEqual('[Location API] Search Locations Failure');
        });
    }));
});
