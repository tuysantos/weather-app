import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ApiState } from '../../model/api.satets';
import { ComparationFacade } from '../../store/comparation/comparation-store.facade';
import { LocationType } from '../../model/location';

import { WeatherComparationComponent } from './weather-comparation.component';
import { WeatherForeCast } from '../../model/weather';
import { consolidated_weather } from '../../model/mockData';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('WeatherComparisonComponent', () => {
  let component: WeatherComparationComponent;
  let fixture: ComponentFixture<WeatherComparationComponent>;
  let comparationFacade: ComparationFacade;

  const locationType: LocationType = {
    title: 'London',
    location_type: 'city',
    woeid: 12345,
    latt_long: ''
  };

  const cities: WeatherForeCast[] = [{
    consolidated_weather,
    title: 'London',
    location_type: 'city',
    woeid: 12345,
    latt_long: '',
    timezone: '',
  }];

  class ComparationFacadeMock {
    apiState$ = of(ApiState.Done);
    count$ = of(2);
    comparation$ = of(cities);

    addToComparation(woeid: number): void {}
    removeFromComparation(woeid: number): void {}
    loadComparation(): void {}
    removeAllFromComparation(): void {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherComparationComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of( locationType )} },
        { provide: ComparationFacade, useClass: ComparationFacadeMock },
        {provide: MatSnackBar, useValue: {}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComparationComponent);
    comparationFacade =  TestBed.inject(ComparationFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove all locations', () => {
    spyOn(comparationFacade, 'removeAllFromComparation');
    component.removeAllItems();
    expect(comparationFacade.removeAllFromComparation).toHaveBeenCalled();
  });

  it('should remove one location', () => {
    spyOn(comparationFacade, 'removeFromComparation');
    component.removeItem(123);
    expect(comparationFacade.removeFromComparation).toHaveBeenCalledWith(123);
  });
});
