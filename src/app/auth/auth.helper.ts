import * as jwt_decode from 'jwt-decode';
import { AuthResult } from '../api/index';
import { UserStateModel } from './user.state';

export interface StoreData {
  access_token: string;
  expires_at: number;
}

export enum StoreFields {
  AccessToken = 'cht_access_token',
  ExpiresAt = 'cht_expires_at',
}

export class AuthHelper {
  static getState() {
    return AuthHelper.createStateObject(AuthHelper.loadData());
  }

  static createStateObject(data: StoreData): UserStateModel {
    return {
      user: AuthHelper.decodeJwtToken(data.access_token),
      access_token: data.access_token,
      expires_at: data.expires_at,
      isAuth: AuthHelper.notExpired(data.expires_at),
    };
  }

  static decodeJwtToken(token) {
    if (!token) {
      return null;
    }
    return jwt_decode(token);
  }

  static notExpired(expiresAt: number) {
    return new Date().getTime() < expiresAt;
  }

  static resetStoreData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(StoreFields.AccessToken);
      localStorage.removeItem(StoreFields.ExpiresAt);
    }
  }

  static loadData(): StoreData {
    let token = '';
    let expires = 0;

    if (typeof window !== 'undefined') {
      expires = +localStorage.getItem(StoreFields.ExpiresAt);
      token = localStorage.getItem(StoreFields.AccessToken);
    }

    return {
      access_token: token,
      expires_at: expires ? expires : 0,
    };
  }

  static saveAuthRes(authRes: AuthResult) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(StoreFields.AccessToken, authRes.access_token);
      localStorage.setItem(
        StoreFields.ExpiresAt,
        String(authRes.expires_in ? new Date().getTime() + authRes.expires_in * 1000 : authRes['expires_at'])
      );
    }
  }

  static getAuthorizationHeader() {
    let token = '';

    if (typeof window !== 'undefined') {
      token = localStorage.getItem(StoreFields.AccessToken);
    }

    return 'Bearer ' + token;
  }
}
