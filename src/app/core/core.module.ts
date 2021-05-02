import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './user.service';
import {BackendModule} from './http/backend.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BackendModule
  ],
  providers: [
    UserService],
  declarations: []
})
export class CoreModule {
}
