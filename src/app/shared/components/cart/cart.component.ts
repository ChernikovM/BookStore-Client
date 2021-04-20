import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { PrintingEdition } from '../../models/PrintingEdition/PrintinEdition';
import { CartService } from '../../services/cart/cart.service';
import { PaymnetService } from '../../services/payment/paymnet.service';
import { PrintingEditionService } from '../../services/printing-edition/printing-edition.service';
import { PaymentActions } from '../../store/payment/payment.actions';
import { ViewCollectionActions } from '../../store/viewCollection/view-collection.actions';
import { ViewCollectionState } from '../../store/viewCollection/view-collection.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
 
})
export class CartComponent implements OnInit {

  @Select(ViewCollectionState.getData) list$!: Observable<PrintingEdition[]>;

  cartList: {id: number, count: number}[] = [];
  dataSet: {pe: PrintingEdition, count: number}[] = [];
  totalPrice: number = 0;

  loading: boolean = false;

  constructor(
    private _cartService: CartService, 
    private _store: Store, 
    private _peService: PrintingEditionService,
    private _paymentService: PaymnetService
    ) { }

  ngOnInit(): void {
    this.cartList = this._cartService.getItems();
    this.buildFilterString();
    this.getData();
    this.list$.subscribe(data => {
      this.dataSet = [];
      for(let i = 0; i < data.length; ++i){
        let item: {pe: PrintingEdition, count: number} = {pe: data[i], count: 0};
        item.count = this.cartList[this.cartList.findIndex(x => x.id === data[i].id)].count;
        this.dataSet.push(item);
      }
    });
  }

  buildFilterString(){
    let filter: string = '';
    let first: boolean = true;
    
    this.cartList.forEach(element => {
      if(!first){
        filter+='||';
      }
      filter += `Id=\"${element.id}\"`;
      if(first){
        first = false;
      }  
    });

    this._store.dispatch(new ViewCollectionActions.UpdateFiltersArray([filter]));
  }

  getData(){
    if(this.cartList.length){
      this._store.dispatch(new ViewCollectionActions.SetPageSize(this.cartList.length));
    }
    this._store.dispatch(new ViewCollectionActions.GetData(this._peService));
  }

  getCount(id: number): number{
    return this.cartList.find(x => x.id === id)!.count;
  }

  removeItemFromCart(id: number){
    let index: number = -1;
    index = this.dataSet.findIndex(x => x.pe.id === id);

    this._cartService.remove(id);
    this.dataSet.splice(index, 1);
  }

  increment(id: number){
    this._cartService.increment(id);
    this.dataSet[this.dataSet.findIndex(x => x.pe.id === id)].count++;
  }

  decrement(id: number){
    this._cartService.decrement(id);
    this.dataSet[this.dataSet.findIndex(x => x.pe.id === id)].count--;
  }

  getTotalPrice(): number{
    this.totalPrice = 0;
    this.dataSet.forEach(element => {
      this.totalPrice += element.count*element.pe.price;
    });
    return this.totalPrice;
  }

  pay(){
    this.loading = true;
    this._store.dispatch(new PaymentActions.CreateSession(this._paymentService.createSessionRequestModel(this.dataSet)));
  }
}
