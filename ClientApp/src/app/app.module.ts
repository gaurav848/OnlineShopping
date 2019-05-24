import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import * as AppDirectives from '@app/directives/index';
import * as AppPipes from '@app/pipes/index';
import * as AppServices from '@app/services/index';
import * as AppComponents from '@app/components/index';


@NgModule({
  declarations: [
    //AppComponent
    AppComponents.AppComponent,
    AppComponents.HomeComponent,
    AppComponents.ToastComponent,
    AppComponents.LoadMsgComponent,
    AppDirectives.AutoFocusDirective,
    AppPipes.FilterByAndPipe,
    AppPipes.FilterByOrPipe,

    
  ],
  exports: [
    AppPipes.FilterByAndPipe,
    AppPipes.FilterByOrPipe

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AppComponent, // Temporarily here, will be removed.
    AppPipes.FilterByAndPipe,
    AppPipes.FilterByOrPipe,

  ],
  bootstrap: [AppComponents.AppComponent]
})
export class AppModule { }
