import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IIndexResponseModel } from '../../models/IndexResponse/IIndexResponseModel';
import { IPageResponseModel } from '../../models/Page/IPageResponseModel';
import { ViewCollectionActions } from './view-collection.actions';

export class ViewCollectionStateModel {
  public currentPage!: number;
  public pageSize!: number;

  public responsePageModel!: IPageResponseModel;

  public filterColumnName!: string;
  public filters!: string[];
  public filterString!: string | undefined;

  public sortString!: string | undefined;

  public data!: any[];
  public fullDataCollectionCount!: number;
}

const defaults = {
  currentPage: 1,
  pageSize: environment.defaultPageSize,

  responsePageModel: {
    currentPageNumber: 0,
    totalPages: 0,
    pageSize: 0,
    hasPreviousPage: false,
    hasNextPage: false
  },

  filterColumnName: '',
  filters: [],
  filterString: undefined,

  sortString: undefined,
  
  data: [],
  fullDataCollectionCount: 0,
};

@State<ViewCollectionStateModel>({
  name: 'viewCollection',
  defaults
})
@Injectable()
export class ViewCollectionState {

  @Selector()
  static getResponsePageModel(state: ViewCollectionStateModel){
    return state.responsePageModel;
  }

  @Selector()
  static getPageSize(state: ViewCollectionStateModel){
    return state.pageSize;
  }

  @Selector()
  static getData(state: ViewCollectionStateModel){
    return state.data;
  }

  @Selector()
  static getFullDataCollectionCount(state: ViewCollectionStateModel){
    return state.fullDataCollectionCount;
  }

  @Selector()
  static getFiltersArray(state: ViewCollectionStateModel){
    return state.filters;
  }

  @Selector()
  static getFilterColumnName(state: ViewCollectionStateModel){
    return state.filterColumnName;
  }

  @Selector()
  static getSortString(state: ViewCollectionStateModel){
    return state.sortString;
  }

  
  @Action(ViewCollectionActions.GetData)
  getData(context: StateContext<ViewCollectionStateModel>, {payload}: ViewCollectionActions.GetData){
    const state = context.getState();
    return payload.getCollection({
      pageRequestModel: { pageSize: state.pageSize, page: state.currentPage },
      filter: state.filterString,
      SortBy: state.sortString
    }).pipe(
      tap((result: IIndexResponseModel) => {
        context.setState({
          ...state,
          data: result.dataCollection,
          fullDataCollectionCount: result.collectionCount,

          sortString: result.sort,
        
          filterString: result.filter, 
          filters: this.getFiltersArrayFromString(state.filterString),

          responsePageModel: result.pageModel,

          currentPage: result.pageModel.currentPageNumber,
          pageSize: result.pageModel.pageSize,

        });
      }),
      //TODO: Записывать ошибки в стейт и выводить TOAST
      //https://ng-bootstrap.github.io/#/components/toast/examples
      catchError(async (result) => {
        
        context.setState({
          ...state,
          data: [],
          fullDataCollectionCount: 0
        })
        for(let i = 0; i < result.error.errors.length; ++i){
          console.log(result.error.errors[i]);
        }
      }),
    )
  }

  @Action(ViewCollectionActions.SetSortString)
  setSortString(context: StateContext<ViewCollectionStateModel>, {payload}: ViewCollectionActions.SetSortString){
    const state = context.getState();
    context.setState({
      ...state,
      sortString: payload,

    });
  }

  @Action(ViewCollectionActions.SetFilterColumn)
  setFilterColumn(context: StateContext<ViewCollectionStateModel>, {payload}: ViewCollectionActions.SetFilterColumn){
    const state = context.getState();
    context.setState({
      ...state,
      filterColumnName: payload,
      
    });
  }

  @Action(ViewCollectionActions.UpdateFiltersArray)
  updateFiltersArray(context: StateContext<ViewCollectionStateModel>, {payload}: ViewCollectionActions.UpdateFiltersArray){
    const state = context.getState();
    context.setState({
      ...state,
      filters: payload,
      filterString: this.getFilterStringFromArray(payload),

    });
  }

  @Action(ViewCollectionActions.SetCurrentPage)
  setCurrentPage(context: StateContext<ViewCollectionStateModel>, {payload}: ViewCollectionActions.SetCurrentPage){
    const state = context.getState();
    context.setState({
      ...state,
      currentPage: payload,

    });
  }

  @Action(ViewCollectionActions.SetPageSize)
  setPageSize(context: StateContext<ViewCollectionStateModel>, {payload}: ViewCollectionActions.SetPageSize){
    const state = context.getState();
    context.setState({
      ...state,
      pageSize: payload,

    });
  }

  private getFilterStringFromArray(array: string[]): string{    
    var result: string = '';

    array.forEach(element => {
      result = result.concat(element, '+');
    });

    return result;
  }

  private getFiltersArrayFromString(filterString: string | undefined): string[]{
    
    if(filterString === undefined || filterString === null){
      return [];
    }

    var result : string[] = [];

    result = filterString.split('+').filter(String);

    return result;
  }
}
