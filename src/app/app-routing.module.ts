import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthGuard } from './auth/auth.guard';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { HelpComponent } from './pages/help/help.component';
import { LoginComponent } from './pages/login/login.component';
import { NewCheckComponent } from './pages/new-check/new-check.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DasboardComponent,
    canActivate: [AuthGuard],
    data: { title: 'Список моніторингів' },
  },
  { path: 'login', component: LoginComponent, data: { title: 'Вхід в сервіс' } },
  { path: 'help', component: HelpComponent, data: { title: 'Допомога' } },
  {
    path: 'new-check',
    component: NewCheckComponent,
    canActivate: [AuthGuard],
    data: { title: 'Новий моніторинг' },
  },
  {
    path: ':id/edit-check',
    component: NewCheckComponent,
    canActivate: [AuthGuard],
    data: { title: 'Редагувати моніторинг' },
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: environment.production ? PreloadAllModules : NoPreloading,
      initialNavigation: 'enabled',
    }),
  ],
  declarations: [],
})
export class AppRoutingModule {}
