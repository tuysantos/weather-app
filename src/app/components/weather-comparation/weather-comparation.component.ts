import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { SorterService } from '../../services/sorter.service';
import { ApiState } from '../../model/api.satets';
import { WeatherDetail, WeatherForeCast } from '../../model/weather';
import {ComparationFacade} from '../../store/comparation/comparation-store.facade';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IComparation {
  id: number;
  consolidated_weather: Array<WeatherDetail>;
}

@Component({
  selector: 'app-weather-comparation',
  templateUrl: './weather-comparation.component.html',
  styleUrls: ['./weather-comparation.component.scss']
})
export class WeatherComparationComponent implements OnInit, OnDestroy {

  public apiState: ApiState = ApiState.Init;
  private destroy$ = new Subject<void>();
  public count = 0;
  public comparationList: WeatherForeCast[] = [];
  public iMaxIndex = [];
  public maxWeatherForecats: WeatherDetail[] = [];
  public checkForMax = false;
  public isSortDesc = true;
  constructor(iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer,
              private comparationFacade: ComparationFacade,
              private snackBar: MatSnackBar,
              private sorterService: SorterService,
              ) {
    iconRegistry.addSvgIcon(
      'arrow_down',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/arrow_down.svg'));
    iconRegistry.addSvgIcon(
        'arrow_up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/arrow_up.svg'));
  }

  ngOnInit(): void {
    this.comparationFacade.comparation$.pipe(
      filter(cmp => !!cmp),
      takeUntil(this.destroy$))
      .subscribe(cmp => {
        this.comparationList = cmp;
      }, (err: Error) => {
        this.openSnackBar(err.message, 'Error');
      });

    this.comparationFacade.apiState$.pipe(
        filter(apiState => !!apiState),
        takeUntil(this.destroy$))
      .subscribe(apiState => {
        this.apiState = apiState;
        if (apiState === ApiState.Done) {
          this.sortComparationList();
        }
      }, (err: Error) => {
        this.openSnackBar(err.message, 'Error');
      });

    this.comparationFacade.count$.pipe(
      filter(count => !!count),
      takeUntil(this.destroy$))
    .subscribe(count => {
      this.count = count;
    });
  }

  sortComparationList(): void {
    const temp: IComparation[] = [];
    let index = 0;
    let iMax = 0;
    this.comparationList.forEach(item => {
        const itemData: IComparation = {
          id: item.woeid,
          consolidated_weather: item.consolidated_weather
        };
        temp.push(itemData);
      });
    const tempCurrent = [...temp];

    if (tempCurrent && tempCurrent.length > 0) {
      const foracastDays = tempCurrent[0].consolidated_weather.length;
      let currentMax = 0;
      // loop the number of forecast days defined by the 'consolidated_weather.length' (ex. 6 days)
      for (let i = 0; i < foracastDays; i++) {
        for (let x = 0; x < temp.length; x++) {
          const maxTemp = Math.round(temp[x].consolidated_weather[index].max_temp); // get max_temp value for that city in that forecast day
          if (x === 0) {
            currentMax = maxTemp;
          } else {
            if (currentMax < maxTemp) {
              iMax = x;
            }
            currentMax = currentMax > maxTemp ? currentMax : maxTemp;
          }
        }
        this.iMaxIndex.push(iMax);
        iMax = 0;
        index++;
      }
      this.maxTempForecast();
    }
  }

  maxTempForecast(): void {
    if (this.comparationList.length > 0) {
      this.checkForMax = this.comparationList.length > 1;
      const foracastDays = this.comparationList[0].consolidated_weather.length;
      for (let i = 0; i < foracastDays; i++) {
        const indexValue = this.iMaxIndex[i];
        if (this.comparationList[indexValue]) {
          this.maxWeatherForecats.push(this.comparationList[indexValue].consolidated_weather[i]);
        }
      }
    }
  }

  removeItem(id: number): void {
    this.comparationFacade.removeFromComparation(id);
  }

  removeAllItems(): void {
    this.comparationFacade.removeAllFromComparation();
    window.history.back();
  }

  goBack(): void {
    window.history.back();
  }

  sortForecast(): void {
    this.isSortDesc = !this.isSortDesc;
    const temp: WeatherForeCast[] = [];
    const dir = this.isSortDesc ? -1 : 1;
    this.comparationList.forEach(item => {
      const obj: WeatherForeCast = {
        ...item,
        consolidated_weather: this.sorterService.sortBy(item.consolidated_weather, 'applicable_date', dir)
      };
      temp.push(obj);
    });
    this.comparationList = [...temp];
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
