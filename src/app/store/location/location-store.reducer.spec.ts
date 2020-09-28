
import { HttpErrorResponse } from '@angular/common/http';
import { ApiState } from '../../model/api.satets';
import { LocationsStoreReducer, LocationsStoreState } from './location-store.reducer';
import { LocationType } from '../../model/location';
import { LocationsActions } from './location-store.actions';

describe('LocationsStoreReducer', () => {
    const cities: LocationType[] = [{
        title: 'London',
        location_type: 'city',
        woeid: 54321,
        latt_long: ''
      },
      {
        title: 'Manchester',
        location_type: 'city',
        woeid: 12345,
        latt_long: ''
      }];

    const initialState: LocationsStoreState = {
        locations: [],
        apiState: ApiState.Init,
        error: null,
    };

    it('should create a reducer', () => {
        const result = LocationsStoreReducer.reducer(initialState, LocationsActions.searchLocation);
        expect(result.apiState).toEqual(ApiState.Pending);
    });

    it('should fire searchLocationSuccess action', () => {
        const result = LocationsStoreReducer.reducer(
            initialState,
            LocationsActions.searchLocationSuccess({
                payload: cities,
            })
        );
        expect(result.locations).toEqual(cities);
        expect(result.apiState).toEqual(ApiState.Done);
    });

    it('should fire searchLocationFailure action', () => {
        const result = LocationsStoreReducer.reducer(
            initialState,
            LocationsActions.searchLocationFailure(new HttpErrorResponse({ error: 'some error occured' }))
        );
        expect(result.apiState).toEqual(ApiState.Error);
    });
});
