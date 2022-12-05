import { MatDialog } from '@angular/material';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { AuthService } from '../api';
import { AppRoutingService } from '../core/app-routing.service';
import { Login, LoginDeveloper, LoginSuccess, SignOut } from './auth.actions';
import { AuthHelper } from './auth.helper';
import * as Sentry from '@sentry/browser';

export interface UserStateModel {
  isAuth: boolean;
  user?: any;
  access_token?: string;
  expires_at?: number;
  loading?: boolean;
}

function setSentryContext(auth: UserStateModel) {
  Sentry.configureScope(scope => {
    scope.setUser({
      lastName: auth.user.lastName,
      firstName: auth.user.firstName,
      username: auth.user.username,
      id: auth.user.id,
    });
  });
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    ...AuthHelper.getState(),
    loading: false,
  },
})
export class UserState {
  constructor(private api: AuthService, private dialog: MatDialog, private router: AppRoutingService) {
    const auth = AuthHelper.getState();
    if (auth.isAuth) {
      setSentryContext(auth);
    }
  }

  @Action(Login)
  login({ getState, setState, dispatch }: StateContext<UserStateModel>, { payload }: Login) {
    setState({ ...getState(), loading: true });

    return this.api.authWithTgPost(payload).pipe(
      tap(response => {
        AuthHelper.saveAuthRes(response);
        dispatch(new LoginSuccess(AuthHelper.getState()));
      })
    );
  }

  @Action(LoginDeveloper)
  loginDev({ getState, setState, dispatch }: StateContext<UserStateModel>) {
    setState({ ...getState(), loading: true });

    return this.api.authWithLocalDevGet().pipe(
      tap(response => {
        AuthHelper.saveAuthRes(response);
        dispatch(new LoginSuccess(AuthHelper.getState()));
      })
    );
  }

  @Action(LoginSuccess)
  loginSuccess({ getState, setState, dispatch }: StateContext<UserStateModel>, { payload }: LoginSuccess) {
    setState({ ...getState(), ...payload, loading: false });

    setSentryContext(payload);
  }

  @Action(SignOut)
  signOut({ getState, setState, dispatch }: StateContext<UserStateModel>) {
    AuthHelper.resetStoreData();
    setState({ ...getState(), isAuth: false, user: null, access_token: '', expires_at: 0 });
    this.dialog.closeAll();
    this.router.goToLoginPage();
  }
}
