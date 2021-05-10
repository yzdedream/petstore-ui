import {Injectable} from '@angular/core';
import {OrderCreateForm, ShopEndpoint} from '../../core/apina/apina';

@Injectable()
export class StoreService {

  constructor(private shopEndpoint: ShopEndpoint) {
  }

  getInventory() {
    return this.shopEndpoint.getInventory();
  }

  createOrder(form: OrderCreateForm) {
    return this.shopEndpoint.createOrder(form);
  }

  getOrders() {
    return this.shopEndpoint.getOrders();
  }

  deleteOrder(orderId: number) {
    return this.shopEndpoint.deleteOrder(orderId);
  }
}
