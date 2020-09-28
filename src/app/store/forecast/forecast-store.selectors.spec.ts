
import { HttpErrorResponse } from '@angular/common/http';
import { ApiState } from '../../model/api.satets';
import { ForecastStoreState } from './forecast-store.reducer';
import { ForecastSelectors } from './forecast-store.selectors';
import { WeatherForeCast } from '../../model/weather';
import {consolidated_weather} from '../../model/mockData';

describe('ForecastSelectors', () => {

    const city: WeatherForeCast = {
        consolidated_weather,
        title: 'London',
        location_type: 'city',
        woeid: 12345,
        latt_long: '',
        timezone: '',
      };

    const initialDataState: ForecastStoreState = {
        weatherForecast: null,
        apiState: ApiState.Init,
        error: null,
    };

    const initialErrorDataState: ForecastStoreState = {
        weatherForecast: undefined,
        apiState: ApiState.Init,
        error: undefined,
    };

    const errorDataState: ForecastStoreState = {
        weatherForecast: undefined,
        apiState: ApiState.Error,
        error: new HttpErrorResponse({
            headers: null,
            status: 400,
            statusText: 'error',
            url: '',
            error: {
                Errors: [
                    {
                        Code: 'Error occurred',
                        PropertyName: 'my property',
                        PropertyValues: null,
                        Message: 'test 123',
                    },
                ],
            },
        }),
    };

    it('should returns comparation state', () => {
        const forecast = ForecastSelectors.forecast.projector(initialDataState);
        expect(forecast).toBe(initialDataState.weatherForecast);
    });

    it('should returns error state', () => {
        const error = ForecastSelectors.error.projector(initialDataState);
        expect(error).toBe(initialDataState.error);
    });

    it('should returns comparation undefined', () => {
        const forecast = ForecastSelectors.forecast.projector(initialErrorDataState);
        expect(forecast).toBe(undefined);
    });

    it('should returns undefined', () => {
        const error = ForecastSelectors.error.projector(initialErrorDataState);
        expect(error).toBe(undefined);
    });

    it('should returns error state', () => {
        const error = ForecastSelectors.error.projector(errorDataState);
        expect(error.statusText).toBe('error');
    });

    it('should returns apiState', () => {
        const apiState = ForecastSelectors.apiState.projector(initialDataState);
        expect(apiState).toBe(initialDataState.apiState);
    });
});
