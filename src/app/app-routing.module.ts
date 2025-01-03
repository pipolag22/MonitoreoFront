import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userNotLoggedGuard } from './guards/user-not-logged-guard.guard';
import { userLoggedGuard } from './guards/user-logged-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [userNotLoggedGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    canActivate: [userNotLoggedGuard],
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'home',
    canActivate: [userLoggedGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
