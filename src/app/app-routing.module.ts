import { NgModule } from '@angular/core';
import {Routes, RouterModule, Route} from '@angular/router';
import {ViewPageComponent} from './components/view-page/view-page.component';
import {NewPageComponent} from './components/new-page/new-page.component'; // CLI imports router

const routes: Route[] = [
  {path: 'new', component: NewPageComponent},
  {path: 'view', component: ViewPageComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
