
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {LocationListComponent} from './location-list.component';
import { LocationListRoutingModule } from './location-list-routing.module';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
declarations: [LocationListComponent],
imports: [ CommonModule, LocationListRoutingModule, MatButtonModule,
    MatIconModule, MatBadgeModule, MatProgressBarModule, MatSnackBarModule],
entryComponents: [LocationListComponent],
exports: [LocationListComponent],
})
export class LocationListModule {}
