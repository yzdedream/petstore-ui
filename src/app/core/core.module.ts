import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './user/user.service';
import {AuthService} from './user/auth.service';
import {AuthGuard} from './user/auth.guard';
import {ApinaEndpointContext, ApinaModule} from './apina/apina';
import {PetstoreApinaEndpointContext} from './apina/petstore-apina-endpoint-context';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ApinaModule
  ],
  providers: [
    UserService,
    AuthService,
    AuthGuard,
    {provide: ApinaEndpointContext, useClass: PetstoreApinaEndpointContext}
  ],
  declarations: []
})
export class CoreModule {
}
