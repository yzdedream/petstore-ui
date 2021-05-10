import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {ClientComponent} from './client.component';
import {RouterModule} from '@angular/router';
import {ClientHomeComponent} from './client-home/client-home.component';
import {StoreComponent} from './store/store.component';
import {PetComponent} from './pet/pet.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApinaModule} from '../core/apina/apina';
import {MatDialogModule} from '@angular/material/dialog';
import {CreatePetComponent} from './pet/create/create-pet.component';
import {CategoryComponent} from './pet/category/category.component';
import {PetService} from './pet/pet.service';
import {TagsComponent} from './pet/tags/tags.component';
import {MatSelectModule} from '@angular/material/select';
import {PetDetailComponent} from './pet/detail/pet-detail.component';
import {StoreService} from './store/store.service';
import {OrdersComponent} from './store/orders/orders.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    FormsModule,
    ApinaModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClientComponent,
    ClientHomeComponent,
    StoreComponent,
    PetComponent,
    CreatePetComponent,
    CategoryComponent,
    TagsComponent,
    PetDetailComponent,
    OrdersComponent
  ],
  entryComponents: [
    CreatePetComponent,
    CategoryComponent,
    TagsComponent,
    PetDetailComponent,
    OrdersComponent
  ],
  providers: [
    PetService,
    StoreService
  ]
})
export class ClientModule {
}
