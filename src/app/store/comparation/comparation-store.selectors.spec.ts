import { ComparationSelectors } from './comparation-store.selectors';
import { HttpErrorResponse } from '@angular/common/http';
import { ComparationStoreState } from './comparation-store.reducer';
import { ApiState } from '../../model/api.satets';

describe('ComparationSelectors', () => {
    const initialDataState: ComparationStoreState = {
        comparation: [],
        count: 0,
        apiState: ApiState.Init,
        error: null,
    };

    const initialErrorDataState: ComparationStoreState = {
        comparation: undefined,
        count: 0,
        apiState: ApiState.Init,
        error: undefined,
    };

    const errorDataState: ComparationStoreState = {
        comparation: undefined,
        count: 0,
        apiState: ApiState.Error,
        error: new HttpErrorResponse({
            headers: null,
            status: 400,
            statusText: 'error',
            url: '',
            error: {
                Errors: [
                    {
                        Code: 'DuplicatedValue',
                        PropertyName: 'my property',
                        PropertyValues: null,
                        Message: 'test 123',
                    },
                ],
            },
        }),
    };

    it('should returns comparation state', () => {
        const users = ComparationSelectors.comparation.projector(initialDataState);
        expect(users).toBe(initialDataState.comparation);
    });

    it('should returns count state', () => {
        const users = ComparationSelectors.count.projector(initialDataState);
        expect(users).toBe(initialDataState.count);
    });

    it('should returns error state', () => {
        const error = ComparationSelectors.error.projector(initialDataState);
        expect(error).toBe(initialDataState.error);
    });

    it('should returns comparation undefined', () => {
        const users = ComparationSelectors.comparation.projector(initialErrorDataState);
        expect(users).toBe(undefined);
    });

    it('should returns undefined', () => {
        const error = ComparationSelectors.comparation.projector(initialErrorDataState);
        expect(error).toBe(undefined);
    });

    it('should returns error state', () => {
        const error = ComparationSelectors.error.projector(errorDataState);
        expect(error.statusText).toBe('error');
    });

    it('should returns apiState', () => {
        const apiState = ComparationSelectors.apiState.projector(initialDataState);
        expect(apiState).toBe(initialDataState.apiState);
    });
});
