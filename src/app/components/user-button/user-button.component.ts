import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CustomAuthService } from '../../auth/custom-auth.service';

@Component({
  selector: 'cht-user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent implements OnInit {
  @Select('user.user')
  user$: Observable<any>;
  @Select('user.isAuth')
  isAuth$: Observable<boolean>;

  constructor(private cauth: CustomAuthService) {}

  ngOnInit() {}

  signOut() {
    this.cauth.signOut();
  }
}
