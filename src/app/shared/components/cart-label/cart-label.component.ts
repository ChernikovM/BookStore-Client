import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-label',
  templateUrl: './cart-label.component.html',
  styleUrls: ['./cart-label.component.css']
})
export class CartLabelComponent implements OnInit {

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
  }

  get cartItemsCounter(): number{
    return this._cartService.itemsCounter();
  }

}
