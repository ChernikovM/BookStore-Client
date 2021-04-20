import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PaymnetService } from '../../services/payment/paymnet.service';
import { PaymentActions } from './payment.actions';
import { catchError, tap } from 'rxjs/operators';
import { ISessionModel } from '../../models/Payment/ISessionModel';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { of } from 'rxjs';

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
    private _errorHandler: ErrorHandlerService
    ){ }

  @Action(PaymentActions.CreateSession)
  createSession(context : StateContext<PaymentStateModel>, { payload }: PaymentActions.CreateSession) {
    const state = context.getState();

    return this._paymentService.createSession(payload).pipe(
      tap((result: ISessionModel) => {
        this._paymentService.pay(result.sessionId);
      }),
      catchError((error) => {
        this._errorHandler.handleErrors(error.error.errros);
        return of(error);
      })
    );
  }

  @Action(PaymentActions.PaymentSuccess)
  paymentSuccess(context : StateContext<PaymentStateModel>, {payload}: PaymentActions.PaymentSuccess){
    debugger;
    return this._paymentService.paymentSuccess(payload.sessionId, payload.orderId).pipe(
      tap(() => {

      }),
      catchError((error) => {
        this._errorHandler.handleErrors(error.error.errors);
        return of(error);
      })
    );
  }
}
