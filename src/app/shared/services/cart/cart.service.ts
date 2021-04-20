import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PrintingEdition } from '../../models/PrintingEdition/PrintinEdition';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _items: {id: number, count: number}[] = [];

  constructor(private _cookieService: CookieService) {
    this._items = JSON.parse(this._cookieService.get('items') || '[]');
   }

  add(item: PrintingEdition, count: number = 1){
    const index: number = this._items.findIndex(x => x.id === item.id);

    if(index != -1){
      this._items[index].count += count;
      this.syncItems();
      return;
    }

    this._items.push({id: item.id, count: count});
    this.syncItems();
  }

  itemsCounter(): number{
    return this._items.length;
  }

  remove(id: number) {
    const index = this._items.findIndex(x => x.id === id);
    this._items.splice(index,1);
    this.syncItems();
  }

  clear(){
    this._items = [];
    this.syncItems();
  }

  increment(id: number){
    const index: number = this._items.findIndex(x => x.id === id);

    if(index > -1){
      this._items[index].count += 1;
      this.syncItems();
    }
  }

  decrement(id: number){
    const index: number = this._items.findIndex(x => x.id === id);

    if(index > -1){
      if(this._items[index].count === 1){
        this.remove(id);
      }
      else{
        this._items[index].count -= 1;
      }
      this.syncItems();
    }
  }

  getItems(): {id: number, count: number}[]{
    return JSON.parse(this._cookieService.get('items') || '[]');
  }

  syncItems(){
    this._cookieService.set('items', JSON.stringify(this._items));    
  }
}
