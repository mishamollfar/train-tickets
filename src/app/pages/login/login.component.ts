import { AfterViewInit, ChangeDetectionStrategy, Component, isDevMode, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { CustomAuthService } from '../../auth/custom-auth.service';
import { UserState, UserStateModel } from '../../auth/user.state';
import { AppRoutingService } from '../../core/app-routing.service';

@Component({
  selector: 'cht-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, AfterViewInit {
  blockWork = [
    { title: 'вхід через Telegram', icon: { name: 'account_box', color: 'primary' } },
    { title: 'створити моніторинг', icon: { name: 'schedule', color: 'primary' } },
    { title: 'пошук квитків', icon: { name: 'youtube_searched_for', color: 'primary' } },
    { title: 'сповіщення в меседжер', icon: { name: 'message', color: 'primary' } },
  ];

  images = [
    { image: 'lux.jpg', title: 'люкс' },
    { image: 'cupe.jpg', title: 'купе' },
    { image: 'beath.jpg', title: 'плацкарт' },
    { image: 'c1.jpg', title: 'сидячий С1' },
    { image: 'c2.jpg', title: 'сидячий С2' },
  ];

  @Select(UserState)
  user$: Observable<UserStateModel>;

  constructor(
    private route: ActivatedRoute,
    private cauth: CustomAuthService,
    private zone: NgZone,
    private router: AppRoutingService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle('Railway Ticket / Вхід');

    // redirect to home if user already authenticated
    const qp = this.route.snapshot.queryParamMap;
    this.user$
      .pipe(
        map(user => user.isAuth),
        first(),
        tap(isAuth => {
          if (isAuth) {
            this.router.goToHomePage();
          } else if (qp.has('auth_date') && qp.has('hash')) {
            this.login({
              ...this.route.snapshot.queryParams,
              id: parseInt(qp.get('id'), 10),
              auth_date: parseInt(qp.get('auth_date'), 10),
            });
          }
        })
      )
      .subscribe();
  }

  login(user) {
    this.cauth.login(user);
  }

  get devMode() {
    return isDevMode();
  }

  loginDeveloper() {
    this.cauth.loginDev();
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      const self = this;
      window['___TgOnLogin'] = function(user) {
        self.zone.run(() => self.login(user));
      };
      const botname = 'CheckTrainTicketBot';
      const el = document.createElement('script');
      el.setAttribute('src', 'https://telegram.org/js/telegram-widget.js?4');
      el.setAttribute('data-telegram-login', botname);
      el.setAttribute('data-size', 'large');
      el.setAttribute('data-onauth', '___TgOnLogin(user)');
      el.setAttribute('data-request-access', 'write');
      document.getElementById('telegramLoginWidget').appendChild(el);
    }
  }
}
