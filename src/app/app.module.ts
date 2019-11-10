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
import {AboutComponent} from './pages/about/about.component';
import { environment } from '../environments/environment';
import {SharedModule} from './shared/shared.module';
import {YesNoModalComponent} from './shared/utility-components/modals/yes-no-modal/yes-no-modal.component';
import {XIV_API_KEY} from 'src/app/shared/api/xivapi/xiv-api-2.service';
import {httpInterceptorProviders} from 'src/app/shared/interceptors';

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
    AboutComponent,
    YesNoModalComponent
  ],
  entryComponents: [LoginComponent, YesNoModalComponent],
  providers: [
    httpInterceptorProviders,
    { provide: XIV_API_KEY, useValue: environment.xivAPIKey}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
