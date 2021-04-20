import { ICreateSessionRequestModel } from "../../models/Payment/ICreateSessionRequestModel";

export enum EPaymentAction {
  CreateSession = '[Payment] Create new session',
  PaymentSuccess = '[Payment] Payment Success'
}

export namespace PaymentActions{

  export class CreateSession{
    static readonly type = EPaymentAction.CreateSession;
    constructor(public payload: ICreateSessionRequestModel) { }
  }

  export class PaymentSuccess{
    static readonly type = EPaymentAction.PaymentSuccess;
    constructor(public payload: {sessionId: string, orderId: number}) { }
  }
}