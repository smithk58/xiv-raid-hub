import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { XivapiClientModule } from '@xivapi/angular-client';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { SharedModule } from './shared/shared.module';
import { YesNoModalComponent } from './shared/utility-components/modals/yes-no-modal/yes-no-modal.component';
import { httpInterceptorProviders } from 'src/app/shared/interceptors';
import { IsAuthedGuard } from 'src/app/shared/IsAuthedGuard';
import { AppConfigService } from 'src/app/app-config.service';

export function baseAPIUrlConfig(config: AppConfigService) {
  return () => {
    return config.init();
  };
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    SharedModule,
    XivapiClientModule,
    LoadingBarHttpClientModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    AboutComponent,
    YesNoModalComponent
  ],
  providers: [
    httpInterceptorProviders,
    IsAuthedGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: baseAPIUrlConfig,
      deps: [AppConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
