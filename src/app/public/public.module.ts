import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicHomeComponent} from './home/public-home.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {PublicComponent} from './public.component';
import {RegisterComponent} from './register/register.component';
import {CoreModule} from '../core/core.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    FormsModule
  ],
  declarations: [PublicHomeComponent, LoginComponent, PublicComponent, RegisterComponent]
})
export class PublicModule {
}
