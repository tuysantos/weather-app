
import { HttpErrorResponse } from '@angular/common/http';
import { ComparationStoreReducer, ComparationStoreState } from './comparation-store.reducer';
import { consolidated_weather } from '../../model/mockData';
import { WeatherForeCast } from '../../model/weather';
import { ComparationActions } from './comparation-store.actions';
import { ApiState } from '../../model/api.satets';

describe('ComparationStoreReducer', () => {
    const cities: WeatherForeCast[] = [{
        consolidated_weather,
        title: 'London',
        location_type: 'city',
        woeid: 12345,
        latt_long: '',
        timezone: '',
      }];

    const initialState: ComparationStoreState = {
        comparation: cities,
        count: 0,
        apiState: ApiState.Init,
        error: null,
    };

    it('should create a reducer', () => {
        const result = ComparationStoreReducer.reducer(initialState, ComparationActions.loadComparation);
        expect(result.apiState).toEqual(ApiState.Pending);
    });

    it('should fire addComparationSuccess action', () => {
        const result = ComparationStoreReducer.reducer(
            initialState,
            ComparationActions.addComparationSuccess({
                payload: cities[0],
            })
        );
        expect(result.comparation[0].title).toEqual('London');
    });

    it('should fire removeComparation action', () => {
        const result = ComparationStoreReducer.reducer(
            initialState,
            ComparationActions.removeComparation({
                payload: 12345,
            })
        );
        expect(result.count).toEqual(0);
        expect(result.comparation.length).toEqual(0);
    });

    it('should fire addComparationFailure action', () => {
        const result = ComparationStoreReducer.reducer(
            initialState,
            ComparationActions.addComparationFailure(new HttpErrorResponse({ error: 'some error occured' }))
        );
        expect(result.apiState).toEqual(ApiState.Error);
    });

    it('should fire remove all Comparation action', () => {
        const result = ComparationStoreReducer.reducer(
            initialState,
            ComparationActions.removeAllComparation()
        );
        expect(result.count).toEqual(0);
        expect(result.comparation.length).toEqual(0);
    });
});
