import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, take, takeUntil, timestamp } from 'rxjs/operators';
import { ApiState } from 'src/app/model/api.satets';
import { WeatherForeCast } from 'src/app/model/weather';
import { ForecastFacade } from '../../store/forecast/forecast-store.facade';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  public woeid: number;
  public city: WeatherForeCast;
  public subscription: Subscription;
  public apiState: ApiState = ApiState.Init;
  private destroy$ = new Subject<void>();

  constructor(private forecastFacade: ForecastFacade,
              private router: ActivatedRoute,
              private snackBar: MatSnackBar,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.forecastFacade.forecast$
      .pipe(
        filter((city) => !!city),
        takeUntil(this.destroy$)
      )
      .subscribe((city: WeatherForeCast) => {
        this.city = city;
      }, (err: Error) => {
        this.openSnackBar(err.message, 'Error');
      });

    this.forecastFacade.apiState$
        .pipe(filter(apiState => !!apiState), takeUntil(this.destroy$))
        .subscribe(apiState => {
          this.apiState = apiState;
          this.cdRef.detectChanges();
        });

    this.loadForecast();
  }

  loadForecast(): void {
    this.woeid = this.router.snapshot.paramMap.get('id') as unknown as number;
    this.forecastFacade.getForecast(this.woeid);
  }

  goBack(): void {
    window.history.back();
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
