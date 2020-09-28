
import { HttpErrorResponse } from '@angular/common/http';
import { consolidated_weather } from '../../model/mockData';
import { WeatherForeCast } from '../../model/weather';
import { ApiState } from '../../model/api.satets';
import { ForecastStoreReducer, ForecastStoreState } from './forecast-store.reducer';
import { ForecastActions } from './forecast-store.actions';

describe('ForecastStoreReducer', () => {
    const city: WeatherForeCast = {
        consolidated_weather,
        title: 'London',
        location_type: 'city',
        woeid: 12345,
        latt_long: '',
        timezone: '',
      };

    const initialState: ForecastStoreState = {
        weatherForecast: null,
        apiState: ApiState.Init,
        error: null,
    };

    it('should create a reducer', () => {
        const result = ForecastStoreReducer.reducer(initialState, ForecastActions.getForecast);
        expect(result.apiState).toEqual(ApiState.Pending);
    });

    it('should fire getForecastSuccess action', () => {
        const result = ForecastStoreReducer.reducer(
            initialState,
            ForecastActions.getForecastSuccess({
                payload: city,
            })
        );
        expect(result.weatherForecast).toEqual(city);
    });

    it('should fire getForecastFailure action', () => {
        const result = ForecastStoreReducer.reducer(
            initialState,
            ForecastActions.getForecastFailure(new HttpErrorResponse({ error: 'some error occured' }))
        );
        expect(result.apiState).toEqual(ApiState.Error);
    });
});
