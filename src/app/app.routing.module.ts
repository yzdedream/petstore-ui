import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicHomeComponent} from './public/home/public-home.component';
import {LoginComponent} from './public/login/login.component';
import {PublicComponent} from './public/public.component';
import {RegisterComponent} from './public/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: PublicHomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
