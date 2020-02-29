import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth.interceptor.service';
import { LogiinInterceptorService } from './login.interceptor.service';
import {AuthProbaService} from './auth.proba.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    FormsModule,
    HttpClientModule],
    // bitan je redosljed za HTTP_INTERCEPTORS
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: AuthProbaService, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: LogiinInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
