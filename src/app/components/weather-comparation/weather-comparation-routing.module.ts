import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComparationComponent } from './weather-comparation.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherComparationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherComparationRoutingModule {}
