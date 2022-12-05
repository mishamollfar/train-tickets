import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { ApiModule, Configuration } from '../api';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { AuthModule } from '../auth/auth.module';
import { NeedLoginInterceptor } from '../auth/need-login.interceptor';
import { AppRoutingService } from './app-routing.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

export function apiFactory() {
  return new Configuration({
    basePath: environment.apiPath,
    apiKeys: {},
  });
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ApiModule.forRoot(apiFactory),
    AuthModule,
  ],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NeedLoginInterceptor,
      multi: true,
    },
    AppRoutingService,
  ],
  exports: [HttpClientModule],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
