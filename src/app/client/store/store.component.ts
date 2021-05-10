import {Component, OnInit} from '@angular/core';
import {OrderCreateForm, Pet} from '../../core/apina/apina';
import {StoreService} from './store.service';
import {MatDialog} from '@angular/material/dialog';
import {OrdersComponent} from './orders/orders.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  inventory: Pet[];

  constructor(private storeService: StoreService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.storeService.getInventory().subscribe(
      pets => this.inventory = pets,
      error => {
        // show error message
      });
  }

  onOrders() {
    this.dialog.open(OrdersComponent);
  }

  onBuy(petId: number) {
    const form: OrderCreateForm = {
      petId: petId,
      quantity: 1
    };

    this.storeService.createOrder(form).subscribe(
      () => this.loadData(),
      error => {
        // show error
      });
  }
}
