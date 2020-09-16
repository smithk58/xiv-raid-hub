import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { YesNoModalComponent } from './shared/utility-components/modals/yes-no-modal/yes-no-modal.component';
import { httpInterceptorProviders } from 'src/app/shared/interceptors';
import { BASE_API_URL } from 'src/app/api-injection-token';
import { IsAuthedGuard } from 'src/app/shared/IsAuthedGuard';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    SharedModule,
    XivapiClientModule.forRoot(),
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
  entryComponents: [YesNoModalComponent],
  providers: [
    httpInterceptorProviders,
    IsAuthedGuard,
    { provide: BASE_API_URL, useValue: environment.baseHref }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
