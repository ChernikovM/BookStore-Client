import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateSessionRequestModel } from '../../models/Payment/ICreateSessionRequestModel';
import { ISessionModel } from '../../models/Payment/ISessionModel';
import { PrintingEdition } from '../../models/PrintingEdition/PrintinEdition';
import { CurrencyType } from '../../providers/enums/CurrencyType';
import { SharedState } from '../../store/shared/shared.state';
import { ViewCollectionState } from '../../store/viewCollection/view-collection.state';

@Injectable({
  providedIn: 'root'
})
export class PaymnetService{

  @Select(ViewCollectionState.getData) cartData$!: Observable<PrintingEdition[]>;
  @Select(SharedState.getCurrency) currency$! : Observable<CurrencyType>

  apiUrl: string;

  stipeApiKey: string;
  stripePromise: Promise<Stripe | null>;

  cartData!: PrintingEdition[];
  currency!: CurrencyType;

  constructor(private _store: Store, private http: HttpClient){
    this.stipeApiKey = environment.stripeApiPrivateKey;
    this.stripePromise = loadStripe( this.stipeApiKey, { apiVersion: "2020-08-27" });

    this.apiUrl = environment.apiUrl + '/paymentManager';

    this.cartData$.subscribe(data => this.cartData = data);
    this.currency$.subscribe(data => this.currency = data);
  }

  public async pay(sessionId: string){
    let stripe = await this.stripePromise;

    stripe?.redirectToCheckout({
      sessionId: sessionId
    });
  };

  public createSession(model: ICreateSessionRequestModel): Observable<ISessionModel>{
    return this.http.post<ISessionModel>(`${this.apiUrl}`, model);
  }

  public createSessionRequestModel(itemsSet: {pe: PrintingEdition, count: number}[]): ICreateSessionRequestModel{
    let orderItems: {id: number, quantity: number}[] = [];

    itemsSet.forEach(element => {
      orderItems.push({id: element.pe.id, quantity: element.count});
    });

    var model: ICreateSessionRequestModel = {
      successUrl: environment.paymentSuccessUrl,
      cancelUrl: environment.paymentCancelUrl,
      currency: this.currency,
      items: orderItems
    };
    return model;
  }

  public paymentSuccess(sessionId: string, orderId: number){
    return this.http.get(`${this.apiUrl}`, {params: {sessionId: sessionId, orderId: orderId.toString()}});
  }
}
