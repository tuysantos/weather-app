
import { HttpErrorResponse } from '@angular/common/http';
import { ApiState } from '../../model/api.satets';
import { LocationsSelectors } from './location-store.selectors';
import { LocationType } from '../../model/location';
import { LocationsStoreState } from './location-store.reducer';

describe('LocationsSelectors', () => {

    const city: LocationType[] = [{
        title: 'London',
        location_type: 'city',
        woeid: 54321,
        latt_long: ''
      }];

    const initialDataState: LocationsStoreState = {
        locations: city,
        apiState: ApiState.Init,
        error: null,
    };

    const initialErrorDataState: LocationsStoreState = {
        locations: undefined,
        apiState: ApiState.Init,
        error: undefined,
    };

    const errorDataState: LocationsStoreState = {
        locations: undefined,
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
        const locations = LocationsSelectors.locations.projector(initialDataState);
        expect(locations).toBe(initialDataState.locations);
    });

    it('should returns error state', () => {
        const error = LocationsSelectors.error.projector(initialDataState);
        expect(error).toBe(initialDataState.error);
    });

    it('should returns comparation undefined', () => {
        const locations = LocationsSelectors.locations.projector(initialErrorDataState);
        expect(locations).toBe(undefined);
    });

    it('should returns undefined', () => {
        const error = LocationsSelectors.error.projector(initialErrorDataState);
        expect(error).toBe(undefined);
    });

    it('should returns error state', () => {
        const error = LocationsSelectors.error.projector(errorDataState);
        expect(error.statusText).toBe('error');
    });

    it('should returns apiState', () => {
        const apiState = LocationsSelectors.apiState.projector(initialDataState);
        expect(apiState).toBe(initialDataState.apiState);
    });
});
