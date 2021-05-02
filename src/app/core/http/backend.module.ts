import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BackendContext} from './backend-context';
import {UserEndpoint} from './UserEndpoint';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BackendContext,
    UserEndpoint
  ],
  declarations: []
})
export class BackendModule {
}
