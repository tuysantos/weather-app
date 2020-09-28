
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, } from '@angular/material/input';
import {SearchComponent} from './search.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
declarations: [SearchComponent],
imports: [ CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, SearchRoutingModule],
entryComponents: [SearchComponent],
exports: [SearchComponent],
})
export class SearchModule {}
