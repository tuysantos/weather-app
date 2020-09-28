import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  public locForm: FormGroup;
  public hasError = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.locForm = this.fb.group({location: ['', Validators.required], });
  }

  validateForm(): void {
    if ( this.locForm.get('location').value.trim() !== '') {
      this.hasError = false;
    }
  }

  search(): void {
    if (this.locForm.valid) {
      const location = this.locForm.get('location').value;
      this.searchEvent.emit(location);
    } else {
      this.hasError = true;
    }
  }
}
