import { LoginWithTgDto } from '../api/model/loginWithTgDto';
import { UserStateModel } from './user.state';

export class Login {
  static readonly type = '[UserState] Login';
  constructor(public payload: LoginWithTgDto) {}
}

export class LoginDeveloper {
  static readonly type = '[UserState] LoginDeveloper';
}

export class LoginSuccess {
  static readonly type = '[UserState] LoginSuccess';
  constructor(public payload: UserStateModel) {}
}

export class SignOut {
  static readonly type = '[UserState] SignOut';
}
