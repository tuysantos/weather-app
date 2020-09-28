import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {LocationType} from '../../model/location';
import {ApiState} from '../../model/api.satets';
import { SorterService } from '../../services/sorter.service';
import { Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { ComparationFacade } from 'src/app/store/comparation/comparation-store.facade';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationListComponent implements OnInit, OnDestroy {

  @Input() locationList: LocationType[] = [];
  @Output() compareLocationsEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() woeidEvent: EventEmitter<number> = new EventEmitter<number>();

  public property = 'title';
  public direction = 1;
  public compareList: Array<number> = [];
  public isSortDesc = true;
  public dispkayNumber = 0;
  public count = 0;
  public apiState: ApiState = ApiState.Init;
  private destroy$ = new Subject<void>();

  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private sorterService: SorterService,
              private comparationFacade: ComparationFacade,
              private cdRef: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              private router: Router) {
    iconRegistry.addSvgIcon(
      'arrow_down',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/arrow_down.svg'));
    iconRegistry.addSvgIcon(
        'arrow_up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/arrow_up.svg'));
  }

  ngOnInit(): void {

    this.comparationFacade.count$.pipe(
      filter(count => !!count),
      takeUntil(this.destroy$))
    .subscribe(count => {
      this.count = count;
      this.dispkayNumber = (this.count === 0) ? null : this.count;
      this.apiState = ApiState.Done;
      this.cdRef.detectChanges();
    }, (err: Error) => {
      this.openSnackBar(err.message, 'Error');
    });

    this.comparationFacade.comparation$.pipe(
      filter(count => !!count),
      takeUntil(this.destroy$))
      .subscribe(cmp => {
        this.compareList = cmp.map(id => id.woeid);
      }, (err: Error) => {
        this.openSnackBar(err.message, 'Error');
      });

   }

  addToCompareList(woeid: number): void {
      if (!this.compareList.find(id => id === woeid)) {
        this.compareList.push(woeid);
        this.apiState = ApiState.Pending;
        this.compareLocationsEvent.emit(woeid);
      }
  }

  sortBy(col: string): void {
    this.property = col;
    this.locationList = this.sorterService.sortBy(this.locationList, col, this.direction);
    this.direction = this.direction * -1;
    this.isSortDesc = !this.isSortDesc;
  }

  isInList(woeid: number): boolean {
    return this.compareList.filter(id => id === woeid).length > 0;
  }

  compareLocations(): void {
    this.router.navigate(['/comparation']);
  }

  viewDetails(woeid: number): void {
    this.woeidEvent.emit(woeid);
  }

  // tslint:disable-next-line: typedef
  trackByFn(index: number, item: LocationType): number {
    return item.woeid;
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
