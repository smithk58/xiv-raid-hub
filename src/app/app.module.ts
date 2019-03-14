import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {XivapiClientModule} from '@xivapi/angular-client';

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RoutingModule} from './routing.module';
import {HomeComponent} from './pages/home/home.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoginComponent} from './shared/authentication/login/login.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {AboutComponent} from './pages/about/about.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CachingInterceptor} from './shared/caching/caching-interceptor';
import { environment } from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {YesNoModalComponent} from './shared/utility-components/yes-no-modal/yes-no-modal.component';
import {XIV_API_KEY} from 'src/app/shared/api/xivapi/xiv-api-2.service';

@NgModule({
  imports: [
    BrowserModule,
    RoutingModule,
    SharedModule,
    XivapiClientModule.forRoot(environment.xivAPIKey)
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    SettingsComponent,
    AboutComponent,
    YesNoModalComponent
  ],
  entryComponents: [LoginComponent, YesNoModalComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    { provide: XIV_API_KEY, useValue: environment.xivAPIKey}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
