import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginWithTgDto } from '../api';
import { Login, LoginDeveloper, SignOut } from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class CustomAuthService {
  constructor(private store: Store) {}

  login(authData: LoginWithTgDto) {
    this.store.dispatch(new Login(authData));
  }

  loginDev() {
    this.store.dispatch(new LoginDeveloper());
  }

  signOut() {
    this.store.dispatch(new SignOut());
  }
}
