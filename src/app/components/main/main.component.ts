import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ApiState } from '../../model/api.satets';
import { LocationType } from '../../model/location';
import { LocationsFacade } from '../../store/location/location-store.facade';
import { ComparationFacade } from '../../store/comparation/comparation-store.facade';
import { SorterService } from '../../services/sorter.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public cities: Array<LocationType>;
  public subscription: Subscription;
  public direction = -1;
  public count = 0;
  public totalRecords = 0;
  public apiState: ApiState = ApiState.Init;
  public searchCriteria = '';
  public comparationList: number[] = [];
  private destroy$ = new Subject<void>();

  constructor(private locationsFacade: LocationsFacade,
              private router: Router,
              private comparationFacade: ComparationFacade,
              private cdRef: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              private sorterService: SorterService) {}

  ngOnInit(): void {
    this.locationsFacade.locations$
        .pipe(
          filter(cities => !!cities),
          takeUntil(this.destroy$))
        .subscribe((cities: LocationType[]) => {
          if (cities) {
            this.cities = cities;
            this.totalRecords = cities.length;
            this.sortBy('title');
          }
        }, (err: Error) => {
          this.openSnackBar(err.message, 'Error');
        });

    this.locationsFacade.apiState$
        .pipe(filter(apiState => !!apiState), takeUntil(this.destroy$))
        .subscribe(apiState => {
          this.apiState = apiState;
        }, (err: Error) => {
          this.openSnackBar(err.message, 'Error');
        });

    this.comparationFacade.apiState$.pipe(
        filter(apiState => !!apiState),
        takeUntil(this.destroy$))
      .subscribe(apiState => {
        this.apiState = apiState;
        this.cdRef.detectChanges();
      },
      (err: Error) => {
        this.openSnackBar(err.message, 'Error');
      });

    this.reloadSearch();
  }

  reloadSearch(): void {
    this.totalRecords = this.cities.length;
    this.apiState = ApiState.Done;
    this.searchCriteria = sessionStorage.getItem('searchCriteria');
  }

  resolveSearchEvent(loc: string): void {
    this.searchCriteria = loc;
    sessionStorage.setItem('searchCriteria', loc);
    this.locationsFacade.searchLocations(loc);
  }

  sortBy(col: string): void {
    this.cities = this.sorterService.sortBy(this.cities, col, this.direction);
    this.direction = this.direction * 1;
  }

  addToComparationList(woeid: number): void {
    if (!this.comparationList.find(item => item === woeid)) {
      this.comparationList.push(woeid);
      this.comparationFacade.addToComparation(woeid);
    }
  }

  removeFromList(woeid: number): void {
    if (this.comparationList.find(item => item === woeid)) {
      this.comparationList = this.comparationList.filter(item => item !== woeid);
      this.comparationFacade.removeFromComparation(woeid);
    }
  }

  getLocationDetails(woeid: number): void {
    this.router.navigate(['/detail', woeid]);
  }

  removeAllFromList(): void {
    if (this.comparationList.length > 0) {
      this.comparationFacade.removeAllFromComparation();
    }
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
