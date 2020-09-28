import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiState } from '../../model/api.satets';
import { WeatherForeCast } from '../../model/weather';
import { ComparationFacade } from '../../store/comparation/comparation-store.facade';
import { LocationsFacade } from '../../store/location/location-store.facade';
import { MainComponent } from './main.component';
import { consolidated_weather } from '../../model/mockData';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationType } from '../../model/location';
import { SorterService } from '../../services/sorter.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let comparationFacade: ComparationFacade;
  let locationsFacade: LocationsFacade;

  const locations: LocationType[] = [
    {
      title: 'London',
      location_type: 'city',
      woeid: 54321,
      latt_long: ''
    },
    {
      title: 'Lome',
      location_type: 'city',
      woeid: 22222,
      latt_long: ''
    }
  ];

  const cities: WeatherForeCast[] = [{
    consolidated_weather,
    title: 'London',
    location_type: 'city',
    woeid: 12345,
    latt_long: '',
    timezone: '',
  }];

  class LocationsFacadeMock {
    locations$ = of(locations);
    apiState$ = of(ApiState.Done);
    searchLocations(query: string): void {}
  }

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
      declarations: [ MainComponent ],
      providers: [
        SorterService,
        { provide: LocationsFacade, useClass: LocationsFacadeMock },
        { provide: ComparationFacade, useClass: ComparationFacadeMock },
        {provide: MatSnackBar, useValue: {}}
      ],
      imports: [ RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    comparationFacade =  TestBed.inject(ComparationFacade);
    locationsFacade =  TestBed.inject(LocationsFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeFromComparation', () => {
    spyOn(comparationFacade, 'removeFromComparation');
    component.comparationList = [123];
    component.removeFromList(123);
    expect(comparationFacade.removeFromComparation).toHaveBeenCalledWith(123);
  });

  it('should call addToComparation', () => {
    spyOn(comparationFacade, 'addToComparation');
    component.addToComparationList(123);
    expect(comparationFacade.addToComparation).toHaveBeenCalledWith(123);
  });

  it('should call searchLocations', () => {
    spyOn(locationsFacade, 'searchLocations');
    component.resolveSearchEvent('lon');
    expect(locationsFacade.searchLocations).toHaveBeenCalledWith('lon');
  });

  it('should have done state and cities', () => {
    component.ngOnInit();
    expect(component.apiState).toEqual(ApiState.Done);
    expect(component.cities.length).toEqual(2);
  });
});
