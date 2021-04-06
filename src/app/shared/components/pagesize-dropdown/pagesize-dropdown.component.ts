import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ViewCollectionActions } from '../../store/viewCollection/view-collection.actions';
import { ViewCollectionState } from '../../store/viewCollection/view-collection.state';

@Component({
  selector: 'app-pagesize-dropdown',
  templateUrl: './pagesize-dropdown.component.html',
  styleUrls: ['./pagesize-dropdown.component.css']
})
export class PagesizeDropdownComponent implements OnInit {

  @Select(ViewCollectionState.getPageSize) pageSize$!: Observable<number>

  @Output() pageSizeChanged = new EventEmitter();

  availablePageSizes: number[];

  currentSize: number = 0;

  constructor(private _store: Store) { 
    this.availablePageSizes = environment.availablePageSizes;
  }

  ngOnInit(): void {
    this.pageSize$.subscribe(data => this.currentSize = data);
  }

  onPageSizeChange(size: number){
    if(size == this.currentSize){
      return;
    }

    this._store.dispatch(new ViewCollectionActions.SetPageSize(size));
    this.pageSizeChanged.emit();
  }
}
