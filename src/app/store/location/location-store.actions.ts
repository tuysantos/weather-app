import { createAction, props } from '@ngrx/store';
import { LocationType } from '../../model/location';
import { HttpErrorResponse } from '@angular/common/http';

export class LocationsActions {
    public static searchLocation = createAction(
        '[Location Page] Search Locations',
        props<{ payload: string }>()
    );

    public static searchLocationSuccess = createAction(
        '[Location API] Search Locations Success',
        props<{ payload: LocationType[] }>()
    );

    public static searchLocationFailure = createAction(
        '[Location API] Search Locations Failure',
        props<{ error: HttpErrorResponse }>()
    );
}
