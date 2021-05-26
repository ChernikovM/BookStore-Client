import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PrintingEdition } from 'src/app/shared/models/PrintingEdition/PrintinEdition';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { PrintingEditionService } from 'src/app/shared/services/printing-edition/printing-edition.service';
import { ViewDetailsActions } from 'src/app/shared/store/viewDetails/view-details.actions';
import { ViewDetailsState } from 'src/app/shared/store/viewDetails/view-details.state';

@Component({
  selector: 'app-printing-edition-details',
  templateUrl: './printing-edition-details.component.html',
  styleUrls: ['./printing-edition-details.component.css']
})
export class PrintingEditionDetailsComponent implements OnInit {

  @Select(ViewDetailsState.getData) data$!: Observable<PrintingEdition>

  itemId: string | null = '-1';
  counter: number = 1;

  product!: PrintingEdition;

  constructor(
    private _route: ActivatedRoute, 
    private _store: Store, 
    private _peService: PrintingEditionService,
    private _cartService: CartService,
    private _toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.itemId = this._route.snapshot.paramMap.get("id");
    this._store.dispatch(new ViewDetailsActions.GetData(this._peService, JSON.parse(this.itemId!)));
    
    this.data$.subscribe(x => this.product = x);
  }

  decrement(){
    this.counter--;
  }

  increment(){
    this.counter++;
  }

  getAuthorsList(pe: PrintingEdition): string{
    let result: string = '';
    let firstElement: boolean = true;

    pe.authors.forEach(author => {
      if(!firstElement){
        result += ', ';
      }
      if(firstElement){
        firstElement = false;
      }
      result += author.name;
    });

    return result;
  }

  addToCart(){
    this._cartService.add(this.product, this.counter);
    this._toastrService.success(`Has been added to cart`, `"${this.product.title}" x${this.counter}`);
  }

}
