import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BikeListComponent} from './components/bike-list/bike-list.component';
import {CreateComponent} from './components/create/create.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'bikes',
    component: BikeListComponent,
    data: {title: 'Bikes List'}
  },
  {
    path: 'create',
    component: CreateComponent,
    data: {title: 'Create Bike'}
  },
  {
    path: '',
    redirectTo: '/bikes',
    pathMatch: 'full'
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
