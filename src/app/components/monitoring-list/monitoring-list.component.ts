import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {
  ActiveCheckSuccess,
  CreateCheckSuccess,
  DeleteCheckSuccess,
  LoadChecks,
  UpdateCheckSuccess,
  Error,
} from '../../state/check.actions';
import { ChecksState, ChecksStateModel } from '../../state/checks.state';

@Component({
  selector: 'cht-monitoring-list',
  templateUrl: './monitoring-list.component.html',
  styleUrls: ['./monitoring-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringListComponent implements OnInit, OnDestroy {
  @Select(ChecksState)
  list$: Observable<ChecksStateModel>;

  margin = { margin: '0 12px 0 0' };

  destroy$ = new Subject();

  constructor(private store: Store, private actions$: Actions, private toastr: ToastrService) {
    this.loadChecks();
    this.actionSuccessListener();
    this.actionFailListener();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
  }

  loadChecks() {
    this.store.dispatch(new LoadChecks());
  }

  actionSuccessListener() {
    this.actions$
      .pipe(
        ofActionSuccessful(...[DeleteCheckSuccess, ActiveCheckSuccess, UpdateCheckSuccess, CreateCheckSuccess]),
        takeUntil(this.destroy$),
        tap(({ payload }) => this.toastr.success(payload))
      )
      .subscribe(() => this.loadChecks());
  }

  actionFailListener() {
    this.actions$
      .pipe(
        ofActionSuccessful(Error),
        takeUntil(this.destroy$)
      )
      .subscribe(({ payload }) => this.toastr.error(payload.error.message));
  }
}
