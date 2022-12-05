import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { AuthGuard } from './auth.guard';
import { CustomAuthService } from './custom-auth.service';
import { UserState } from './user.state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([UserState])],
  providers: [CustomAuthService, { provide: AuthGuard, useClass: AuthGuard }],
})
export class AuthModule {}
