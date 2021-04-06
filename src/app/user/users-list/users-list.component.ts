import { Component, OnInit, QueryList, ViewChildren, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SortEvent } from 'src/app/shared/models/events/ISortEvent';
import { IIndexRequestModel } from 'src/app/shared/models/IndexRequest/IIndexRequestModel';
import { IndexRequestModel } from 'src/app/shared/models/IndexRequest/IndexRequestModel';
import { IIndexResponseModel } from 'src/app/shared/models/IndexResponse/IIndexResponseModel';
import { IPageResponseModel } from 'src/app/shared/models/Page/IPageResponseModel';
import { IUserModel } from 'src/app/shared/models/User/IUserModel';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ViewCollectionActions } from 'src/app/shared/store/viewCollection/view-collection.actions';
import { ViewCollectionState } from 'src/app/shared/store/viewCollection/view-collection.state';
import { SortableDirective } from '../sortable.directive';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Select(ViewCollectionState.getData) data$! : Observable<IUserModel[]>;
  @Select(ViewCollectionState.getResponsePageModel) pageModel$! : Observable<IIndexResponseModel>;
  @Select(ViewCollectionState.getFullDataCollectionCount) fullCollectionCount$!: Observable<number>;

  indexRequestModel: IIndexRequestModel;

  sortField: string = '';
  sortString: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  direction: string = '';

  filters: string[] = [];
  filterString: string = '';
  currentFilterColumnName: string = '';

  pagination!: IPageResponseModel;
  config: any;

  @ViewChildren(SortableDirective) headers: QueryList<SortableDirective> = new QueryList();

  constructor(private _store: Store, private _userService: UserService) { 
    this.indexRequestModel = new IndexRequestModel();
  }

  ngOnInit(): void {
    this.getUsersList();

    var totalItems;
    this.fullCollectionCount$.subscribe(data => totalItems = data);
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: totalItems
    };
  }

  getUsersList(){
    this._store.dispatch(new ViewCollectionActions.GetData(this._userService));
  }

  onSort( sortEvent: SortEvent) {
    //resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== sortEvent.column) {
        header.direction = '';
      }
    });

    this.sortField = sortEvent.column;
    this.direction = sortEvent.direction;

    this.getUsersList();
  }

  getUserDetails(user: IUserModel){
    alert(`userDetails: ${user.email}`);
  }

  changeUserStatus(user: IUserModel){
    if(user.lockoutEnd === null)
    {
      alert(`ban ${user.email} action`);
      return;
    }
    alert(`unban ${user.email} action`);
  }

  updateView(){
    this.getUsersList();
  }
}