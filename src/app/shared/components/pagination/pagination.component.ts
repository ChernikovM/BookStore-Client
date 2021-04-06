import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IPageResponseModel } from '../../models/Page/IPageResponseModel';
import { ViewCollectionActions } from '../../store/viewCollection/view-collection.actions';
import { ViewCollectionState } from '../../store/viewCollection/view-collection.state';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Select(ViewCollectionState.getResponsePageModel) pageModel$!: Observable<IPageResponseModel>;
  @Select(ViewCollectionState.getFullDataCollectionCount) dataCount$!: Observable<number>;

  @Output() pageChanged = new EventEmitter();

  page!: number;
  totalPages!: number;
  pageSize!: number;
  collectionSize!: number;

  firstCall: boolean = true;
  
  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.pageModel$.subscribe(data => {
      this.page = data.currentPageNumber;
      this.pageSize = data.pageSize;
      this.totalPages = data.totalPages;
    });
    this.dataCount$.subscribe(data => this.collectionSize = data);
  }

  onPageChanged(){
    if(this.firstCall){
      this.firstCall = false;
      return;
    }
    
    if(this.page <= this.totalPages && this.page >= 0){
      this.updatePage();
    }
  }

  updatePage(){
    this._store.dispatch(new ViewCollectionActions.SetCurrentPage(this.page));
    this.pageChanged.emit();
  }

}
