import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SortEvent } from '../shared/models/events/ISortEvent';
import { IUserModel } from '../shared/models/User/IUserModel';
import { ViewCollectionActions } from '../shared/store/viewCollection/view-collection.actions';
import { ViewCollectionState } from '../shared/store/viewCollection/view-collection.state';

export type SortColumn = keyof IUserModel | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };

@Directive({
  selector: '[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'onSort()'
  }
})
export class SortableDirective {

  @Select(ViewCollectionState.getSortString) sortString$! : Observable<string> 

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';

  @Output() sort = new EventEmitter<SortEvent>();


  constructor(private _store: Store) { 
  }

  onSort() {
    var sortString: string;
    this.direction = rotate[this.direction];

    sortString = this.sortable[0].toUpperCase() + this.sortable.slice(1) + '+' + this.direction;

    if(this.direction === '')
    {
      sortString = '';
    }
    
    this._store.dispatch(new ViewCollectionActions.SetSortString(sortString));

    this.sort.emit({column: this.sortable, direction: this.direction, sortString: sortString});
  }

}
