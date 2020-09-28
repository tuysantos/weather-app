import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search', () => {
    spyOn(component.searchEvent, 'emit');
    component.locForm.controls.location.setValue('loc');
    component.search();
    expect(component.searchEvent.emit).toHaveBeenCalledWith('loc');
  });

  it('should validateForm', () => {
    component.locForm.controls.location.setValue('loc');
    component.validateForm();
    expect(component.hasError).toBe(false);
  });
});
