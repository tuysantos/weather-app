import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SorterService } from '../../services/sorter.service';
import { LocationType } from '../../model/location';
import { LocationListComponent } from './location-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WeatherForeCast } from '../../model/weather';
import { consolidated_weather } from '../../model/mockData';
import { ApiState } from '../../model/api.satets';
import { of } from 'rxjs';
import { ComparationFacade } from 'src/app/store/comparation/comparation-store.facade';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('LocationListComponent', () => {
  let component: LocationListComponent;
  let fixture: ComponentFixture<LocationListComponent>;

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
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationListComponent ],
      providers: [
        SorterService,
        { provide: ComparationFacade, useClass: ComparationFacadeMock },
        {provide: MatSnackBar, useValue: {}}
      ],
      imports: [ RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit compareLocationsEvent', () => {
    spyOn(component.compareLocationsEvent, 'emit');
    component.addToCompareList(1234);
    expect(component.compareLocationsEvent.emit).toHaveBeenCalledWith(1234);
  });

  it('should emit woeidEvent', () => {
    spyOn(component.woeidEvent, 'emit');
    component.viewDetails(1234);
    expect(component.woeidEvent.emit).toHaveBeenCalledWith(1234);
  });

  it('should trackByFn', () => {
    const item: LocationType = {
      title: 'London',
      location_type: 'city',
      woeid: 54321,
      latt_long: ''
    };
    const result = component.trackByFn(1, item);
    expect(result).toEqual(54321);
  });
});
