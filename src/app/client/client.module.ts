import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {ClientComponent} from './client.component';
import {RouterModule} from '@angular/router';
import {ClientHomeComponent} from './client-home/client-home.component';
import {StoreComponent} from './store/store.component';
import {PetComponent} from './pet/pet.component';
import {FormsModule} from '@angular/forms';
import {ApinaModule} from '../core/apina/apina';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ApinaModule
  ],
  declarations: [
    ClientComponent,
    ClientHomeComponent,
    StoreComponent,
    PetComponent
  ]
})
export class ClientModule {
}
