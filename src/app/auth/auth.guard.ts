import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppRoutingService } from '../core/app-routing.service';
import { UserState, UserStateModel } from './user.state';

@Injectable()
export class AuthGuard implements CanActivate {
  @Select(UserState)
  user$: Observable<UserStateModel>;

  constructor(private store: Store, private router: AppRoutingService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.user$.pipe(
      map(user => user.isAuth),
      tap(isAuth => {
        if (!isAuth) {
          this.router.goToLoginPage();
        }
      })
    );
  }
}
