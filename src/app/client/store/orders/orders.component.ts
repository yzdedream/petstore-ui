import {Component, OnInit} from '@angular/core';
import {StoreService} from '../store.service';
import {Order} from '../../../core/apina/apina';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.storeService.getOrders().subscribe(
      orders => this.orders = orders,
      error => {
        // show error
      });
  }

  onDelete(orderId: number) {
    if (confirm('are you sure')) {
      this.storeService.deleteOrder(orderId).subscribe(
        () => this.loadData(),
        error => {
          // show error
        });
    }
  }
}
