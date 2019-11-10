import {RouterModule, Routes} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {AboutComponent} from './pages/about/about.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'analyze', loadChildren: './pages/analyze/analyze.module#AnalyzeModule'},
  {path: 'my-raid', loadChildren: './pages/my-raid/my-raid.module#MyRaidModule'},
  {path: 'configuration', loadChildren: './pages/configuration/watchlist.module#WatchlistModule'},
  {path: 'about', component: AboutComponent},
  {path: '**', component: NotFoundComponent}
];
export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {
  onSameUrlNavigation: 'reload' /*Allows routes to rerun stuff if their same route is visited again (have to opt-in on your route)*/
});
