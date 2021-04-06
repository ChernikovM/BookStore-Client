import { Directive, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { IUserModel } from '../shared/models/User/IUserModel';
import { ViewCollectionActions } from '../shared/store/viewCollection/view-collection.actions';

export type FilterColumn = keyof IUserModel | '';

@Directive({
  selector: '[filterable]',
  host: {
    '(click)': 'setColumn()'
  }
})
export class FilterableDirective {

  @Input() filterable: FilterColumn = '';

  constructor(private _store: Store) { }

  setColumn(){
    this._store.dispatch(new ViewCollectionActions.SetFilterColumn(this.filterable));
  }
}
