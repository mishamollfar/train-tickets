import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { distinctUntilKeyChanged, filter, skip, takeUntil } from 'rxjs/operators';
import { UserState, UserStateModel } from './auth/user.state';
import { AppRoutingService } from './core/app-routing.service';
import * as Sentry from '@sentry/browser';
import { Severity } from '@sentry/browser';

@Component({
  selector: 'cht-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @Select(UserState)
  user$: Observable<UserStateModel>;

  destroy$ = new Subject();

  constructor(private appRouter: AppRoutingService, private actions$: Actions) {}

  ngOnInit() {
    this.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilKeyChanged('isAuth'),
        skip(1)
      )
      .subscribe(state => {
        if (state.isAuth) {
          this.appRouter.goToHomePage();
        } else {
          this.appRouter.goToLoginPage();
        }
      });

    this.ravenLogActions();
  }

  ravenLogActions() {
    this.actions$
      .pipe(
        takeUntil(this.destroy$),
        filter(rs => rs.status === 'DISPATCHED')
      )
      .subscribe(rs => {
        Sentry.addBreadcrumb({
          message: rs.action.constructor.type,
          category: 'ngxs',
          level: Severity.Info,
          data: rs.action.payload,
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
