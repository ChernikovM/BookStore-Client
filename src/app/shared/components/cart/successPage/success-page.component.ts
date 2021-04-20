import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { PaymentActions } from 'src/app/shared/store/payment/payment.actions';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {

  orderId: number;
  sessionId: string;

  constructor(
    private _cartService: CartService,
    private _store: Store,
    private _activatedRoute: ActivatedRoute) {
      this.sessionId = this._activatedRoute.snapshot.queryParamMap.get('session_id')!;
      this.orderId = JSON.parse(this._activatedRoute.snapshot.queryParamMap.get('order_id')!);
  }

  ngOnInit(): void {
    this._cartService.clear();
    debugger;
    this._store.dispatch(new PaymentActions.PaymentSuccess({sessionId: this.sessionId, orderId: this.orderId}));
  }

}
