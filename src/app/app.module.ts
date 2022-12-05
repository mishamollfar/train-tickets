import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import * as Sentry from '@sentry/browser';
import { environment } from '../environments/environment';
import { revision, version } from '../environments/version';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { PagesModule } from './pages/pages.module';
import { getClickPath } from './shared/lib';
import { ChecksState } from './state/checks.state';

Sentry.init({
  dsn: 'https://4252b108c1484976bc8d5b134814ab16@sentry.io/1313785',
  release: version,
  maxBreadcrumbs: 150,
  enabled: environment.production,
  beforeBreadcrumb(breadcrumb, hint) {
    if (breadcrumb.category === 'ui.click') {
      const { target }: { target: HTMLElement } = hint.event;
      // log button name
      const msg = getClickPath(target);
      if (msg) {
        breadcrumb.message = msg;
      }
      // console.log(breadcrumb.message, {target});
    }
    return breadcrumb;
  },
});

Sentry.configureScope(scope => {
  scope.setTag('commit', revision);
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    Sentry.captureException(error.originalError || error);
    console.error(error);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    MaterialModule,
    PagesModule,
    AppRoutingModule,
    CoreModule,
    NgxsModule.forRoot([ChecksState]),
    BrowserModule.withServerTransition({ appId: 'railway-ticket' }),
    NgxsLoggerPluginModule.forRoot({
      logger: console,
      collapsed: false,
      disabled: environment.production,
    }),
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {}
