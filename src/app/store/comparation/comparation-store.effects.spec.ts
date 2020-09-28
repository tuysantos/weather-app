import { async } from '@angular/core/testing';
import { iif, of, ReplaySubject, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComparationEffects } from './comparation-store.effects';
import { HttpErrorResponse } from '@angular/common/http';
import { WeatherService } from '../../services/weather.service';
import { ComparationActions } from './comparation-store.actions';
import { consolidated_weather } from '../../model/mockData';
import { WeatherForeCast } from '../../model/weather';
import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { ComparationStoreState } from './comparation-store.reducer';

const weatherForeCastMock: WeatherForeCast = {
    consolidated_weather,
    title: 'London',
    location_type: 'city',
    woeid: 12345,
    latt_long: '',
    timezone: '',
};

class WeatherServiceMock {
    // fail helper
    public fail = false;

    public getWeatherDetailForeCast = (woeid: number) =>
        iif(
            () => this.fail,
            throwError(new HttpErrorResponse({ error: 'some error occured' })),
            of(weatherForeCastMock)
        )
}

describe('ComparationEffects', () => {
    let service: SpyObject<WeatherServiceMock>;
    let effects: ComparationEffects;
    let actions: ReplaySubject<any>;
    let spectator: SpectatorService<ComparationEffects>;
    let store: SpyObject<Store<ComparationStoreState>>;

    const createService = createServiceFactory({
        service: ComparationEffects,
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
        effects = spectator.inject(ComparationEffects);
        service = spectator.get<WeatherServiceMock>(WeatherService);

        store = spectator.inject<Store<ComparationStoreState>>(Store);
        actions = new ReplaySubject(1);
    });

    it('getForecast$ should dispatch addComparationSuccess action', async(async () => {
        const action = ComparationActions.addComparation({ payload: 123});
        actions.next(action);
        effects.getForecast$.subscribe(result => {
            expect(result.type).toEqual('[Compration API] add to Compration Success');
        });
    }));

    it('getForecast$ should dispatch addComparationFailure action', async(async () => {
        service.fail = true;
        const action = ComparationActions.addComparation({ payload: 123});
        actions.next(action);
        effects.getForecast$.subscribe(result => {
            expect(result.type).toEqual('[Compration API] add to Compration Failure');
        });
    }));

    it('loadComparation$ should dispatch loadComparationSuccess action', async(async () => {
        const action = ComparationActions.loadComparation();
        actions.next(action);
        effects.loadComparation$.subscribe(result => {
            expect(result.type).toEqual('[Compration Page] load Compration');
        });
    }));
});
