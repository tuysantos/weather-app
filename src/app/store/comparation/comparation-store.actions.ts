import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { WeatherForeCast } from '../../model/weather';

export class ComparationActions {
    public static loadComparation = createAction(
        '[Compration Page] load Compration'
    );

    public static loadComparationSuccess = createAction(
        '[Compration Page] load Compration Success'
    );

    public static addComparation = createAction(
        '[Compration Page] add to Compration',
        props<{ payload: number }>()
    );

    public static addComparationSuccess = createAction(
        '[Compration API] add to Compration Success',
        props<{ payload: WeatherForeCast }>()
    );

    public static addComparationFailure = createAction(
        '[Compration API] add to Compration Failure',
        props<{ error: HttpErrorResponse }>()
    );

    public static removeComparation = createAction(
        '[Compration Page] remove from Compration',
        props<{ payload: number }>()
    );

    public static removeAllComparation = createAction(
        '[Compration Page] remove all from Compration'
    );

    public static removeSuccess = createAction(
        '[Compration Page] remove success from Compration'
    );
}
