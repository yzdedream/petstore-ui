import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicHomeComponent} from './public/home/public-home.component';
import {LoginComponent} from './public/login/login.component';
import {PublicComponent} from './public/public.component';
import {RegisterComponent} from './public/register/register.component';
import {ClientComponent} from './client/client.component';
import {AuthGuard} from './core/user/auth.guard';
import {ClientHomeComponent} from './client/client-home/client-home.component';
import {PetComponent} from './client/pet/pet.component';
import {StoreComponent} from './client/store/store.component';

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
  },
  {
    path: '',
    component: ClientComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        component: ClientHomeComponent
      },
      {
        path: 'pets',
        component: PetComponent
      },
      {
        path: 'stores',
        component: StoreComponent
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
