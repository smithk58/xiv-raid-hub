import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationComponent } from './configuration.component';
import { ConfigCharactersComponent } from 'src/app/pages/configuration/config-characters/config-characters.component';
import { ConfigStaticsComponent } from 'src/app/pages/configuration/config-statics/config-statics.component';
import { ConfigurationPaths } from 'src/app/pages/configuration/ConfigurationPaths';

const routes: Routes = [
  {
    path: 'h', /*h for hack, because https://github.com/angular/angular/issues/10981*/
    component: ConfigurationComponent,
    children: [
      {
        path: '',
        redirectTo: '/configuration/h/(tab:' + ConfigurationPaths.Characters + ')',
        pathMatch: 'full'
      },
      {
        path: ConfigurationPaths.Characters,
        outlet: 'tab',
        component: ConfigCharactersComponent
      },
      {
        path: ConfigurationPaths.Statics,
        outlet: 'tab',
        component: ConfigStaticsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
