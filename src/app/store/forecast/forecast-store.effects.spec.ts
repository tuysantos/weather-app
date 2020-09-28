import { async } from '@angular/core/testing';
import { iif, of, ReplaySubject, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForecastEffects } from './forecast-store.effects';
import { HttpErrorResponse } from '@angular/common/http';
import { WeatherService } from '../../services/weather.service';
import { consolidated_weather } from '../../model/mockData';
import { WeatherForeCast } from '../../model/weather';
import { createServiceFactory, SpectatorService, SpyObject } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { ForecastStoreState } from './forecast-store.reducer';
import { ForecastActions } from './forecast-store.actions';

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

describe('ForecastEffects', () => {
    let service: SpyObject<WeatherServiceMock>;
    let effects: ForecastEffects;
    let actions: ReplaySubject<any>;
    let spectator: SpectatorService<ForecastEffects>;
    let store: SpyObject<Store<ForecastStoreState>>;

    const createService = createServiceFactory({
        service: ForecastEffects,
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
        effects = spectator.inject(ForecastEffects);
        service = spectator.get<WeatherServiceMock>(WeatherService);

        store = spectator.inject<Store<ForecastStoreState>>(Store);
        actions = new ReplaySubject(1);
    });

    it('getForecast$ should dispatch getForecastSuccess action', async(async () => {
        const action = ForecastActions.getForecast({ payload: 123});
        actions.next(action);
        effects.getForecast$.subscribe(result => {
            expect(result.type).toEqual('[Forecast API] Get Forecast Success');
        });
    }));

    it('getForecast$ should dispatch getForecastFailure action', async(async () => {
        service.fail = true;
        const action = ForecastActions.getForecast({ payload: 123});
        actions.next(action);
        effects.getForecast$.subscribe(result => {
            expect(result.type).toEqual('[Forecast API] Get Forecast Failure');
        });
    }));
});
