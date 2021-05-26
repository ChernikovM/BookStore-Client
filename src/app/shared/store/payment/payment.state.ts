import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PaymnetService } from '../../services/payment/paymnet.service';
import { PaymentActions } from './payment.actions';
import { tap } from 'rxjs/operators';
import { ISessionModel } from '../../models/Payment/ISessionModel';

export class PaymentStateModel {

}

const defaults = {

};

@State<PaymentStateModel>({
  name: 'payment',
  defaults
})
@Injectable()
export class PaymentState {

  constructor(
    private _paymentService: PaymnetService, 
    ){ }

  @Action(PaymentActions.CreateSession)
  createSession(context : StateContext<PaymentStateModel>, { payload }: PaymentActions.CreateSession) {
    const state = context.getState();

    return this._paymentService.createSession(payload).pipe(
      tap((result: ISessionModel) => {
        this._paymentService.pay(result.sessionId);
      })
    );
  }

  @Action(PaymentActions.PaymentSuccess)
  paymentSuccess(context : StateContext<PaymentStateModel>, {payload}: PaymentActions.PaymentSuccess){
    debugger;
    return this._paymentService.paymentSuccess(payload.sessionId, payload.orderId).pipe(
      tap(() => {

      })
    );
  }
}
