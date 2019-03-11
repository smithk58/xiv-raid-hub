import {RouterModule, Routes} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {AboutComponent} from './pages/about/about.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'analyze', loadChildren: './pages/analyze/analyze.module#AnalyzeModule'},
  {path: 'watchlist', loadChildren: './pages/watchlist/watchlist.module#WatchlistModule'},
  {path: 'settings', component: SettingsComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: NotFoundComponent}
];
export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {
  onSameUrlNavigation: 'reload' /*Allows routes to rerun stuff if their same route is visited again (have to opt-in on your route)*/
});
