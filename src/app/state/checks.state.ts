import { Action, State, StateContext } from '@ngxs/store';
import { finalize, tap } from 'rxjs/operators';
import { ChecksService } from '../api';
import {
  ActiveCheck,
  ActiveCheckSuccess,
  CreateCheck,
  CreateCheckSuccess,
  DeleteCheck,
  DeleteCheckSuccess,
  Error,
  LoadChecks,
  LoadChecksSuccess,
  UpdateCheck,
  UpdateCheckSuccess,
} from './check.actions';

export interface ChecksStateModel {
  list: any[];
  loading: boolean;
  loaded: boolean;
}

@State<ChecksStateModel>({
  name: 'checks',
  defaults: {
    list: [],
    loading: false,
    loaded: false,
  },
})
export class ChecksState {
  constructor(private checksApi: ChecksService) {}

  @Action(LoadChecks)
  loadChecks({ getState, setState, dispatch }: StateContext<ChecksStateModel>) {
    setState({ ...getState(), loading: true });
    return this.checksApi.getChecks().pipe(
      tap(res => dispatch(new LoadChecksSuccess(res)), error => dispatch(new Error(error))),
      finalize(() => setState({ ...getState(), loading: false }))
    );
  }

  @Action(LoadChecksSuccess)
  loadChecksSuccess({ getState, setState, dispatch }: StateContext<ChecksStateModel>, { payload }: LoadChecksSuccess) {
    setState({ ...getState(), list: payload, loaded: true });
  }

  @Action(CreateCheck)
  create({ getState, setState, dispatch }: StateContext<ChecksStateModel>, { payload }: CreateCheck) {
    setState({ ...getState(), loading: true });
    return this.checksApi.createCheck(payload).pipe(
      tap(res => dispatch(new CreateCheckSuccess('Моніторинг створено')), error => dispatch(new Error(error))),
      finalize(() => setState({ ...getState(), loading: false }))
    );
  }

  @Action(CreateCheckSuccess)
  createCheckSuccess({ getState, setState }: StateContext<ChecksStateModel>, { payload }: CreateCheckSuccess) {
    setState({ ...getState(), loaded: true });
  }

  @Action(UpdateCheck)
  update({ getState, setState, dispatch }: StateContext<ChecksStateModel>, { payload }: UpdateCheck) {
    setState({ ...getState(), loading: true });
    return this.checksApi.updateCheck(payload.update, payload.checkId).pipe(
      tap(res => dispatch(new UpdateCheckSuccess('Моніторинг оновлено')), error => dispatch(new Error(error))),
      finalize(() => setState({ ...getState(), loading: false }))
    );
  }

  @Action(UpdateCheckSuccess)
  updateCheckSuccess({ getState, setState }: StateContext<ChecksStateModel>, { payload }: UpdateCheckSuccess) {
    setState({ ...getState(), loaded: true });
  }

  @Action(ActiveCheck)
  activate({ getState, setState, dispatch }: StateContext<ChecksStateModel>, { payload }: ActiveCheck) {
    setState({ ...getState(), loading: true });
    return this.checksApi.updateActive(payload.update, payload.checkId).pipe(
      tap(
        () => dispatch(new ActiveCheckSuccess('Моніторинг ' + (payload.update.active ? 'активовано' : 'деактивовано'))),
        error => dispatch(new Error(error))
      ),
      finalize(() => setState({ ...getState(), loading: false }))
    );
  }

  @Action(ActiveCheckSuccess)
  activateSuccess({ getState, setState }: StateContext<ChecksStateModel>, { payload }: ActiveCheckSuccess) {
    setState({ ...getState(), loaded: true });
  }

  @Action(DeleteCheck)
  deleteCheck({ getState, setState, dispatch }: StateContext<ChecksStateModel>, { payload }: DeleteCheck) {
    setState({ ...getState(), loading: true });
    return this.checksApi.deleteCheck(payload).pipe(
      tap(() => dispatch(new DeleteCheckSuccess('Моніторинг видалено')), error => dispatch(new Error(error))),
      finalize(() => setState({ ...getState(), loading: false }))
    );
  }

  @Action(DeleteCheckSuccess)
  deleteCheckSuccess({ getState, setState }: StateContext<ChecksStateModel>, { payload }: DeleteCheckSuccess) {
    setState({ ...getState(), loaded: true });
  }

  @Action(Error)
  errorThrow({ getState, setState }: StateContext<ChecksStateModel>, { payload }: Error) {
    setState({ ...getState(), loaded: true });
  }
}
