import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { IsAuthedGuard } from 'src/app/shared/IsAuthedGuard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  /*{path: 'analyze', loadChildren: () => import('./pages/analyze/analyze.module').then(m => m.AnalyzeModule)},*/
  {path: 'my-raid', canActivate: [IsAuthedGuard], loadChildren: () => import('./pages/my-raid/my-raid.module').then(m => m.MyRaidModule)},
  {
    path: 'configuration',
    canActivate: [IsAuthedGuard],
    loadChildren: () => import('./pages/configuration/configuration.module').then(m => m.ConfigurationModule)
  },
  {
    path: 'settings',
    canActivate: [IsAuthedGuard],
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
  },
  {path: 'about', component: AboutComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class RoutingModule { }

