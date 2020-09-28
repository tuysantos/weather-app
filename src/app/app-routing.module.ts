import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {path: 'main', component: MainComponent},
  {path: 'comparation', loadChildren: () =>
    import('./components/weather-comparation/weather-comparation.module').then(m => m.WeatherComparationModule)},
  {path: 'detail/:id', loadChildren: () => import('./components/detail/detail.module').then(m => m.DetailModule)},
  {path: '**', redirectTo: '/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
