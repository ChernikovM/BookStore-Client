import { IService } from "../../services/base/IService";

export enum EViewCollectionActions{
  GetData = '[ViewCollection] Get Data',
  SetSortString = '[ViewCollection] Set SortString',
  SetFilterColumn = '[ViewCollection] Set FilterColumn',
  UpdateFiltersArray = '[ViewCollection] Update FiltersArray',
  SetCurrentPage = '[ViewCollection] Set CurrentPage',
  SetPageSize = '[ViewCollection] Set PageSize'
}

export namespace ViewCollectionActions{

  export class GetData {
    static readonly type = EViewCollectionActions.GetData;
    constructor(public payload: IService) { }
  }

  export class SetSortString {
    static readonly type = EViewCollectionActions.SetSortString;
    constructor(public payload: string) { }
  }

  export class SetFilterColumn {
    static readonly type = EViewCollectionActions.SetFilterColumn;
    constructor(public payload: string) { }
  }

  export class UpdateFiltersArray {
    static readonly type = EViewCollectionActions.UpdateFiltersArray;
    constructor(public payload: string[]) { }
  }

  export class SetCurrentPage {
    static readonly type = EViewCollectionActions.SetCurrentPage;
    constructor(public payload: number) {}
  }

  export class SetPageSize {
    static readonly type = EViewCollectionActions.SetPageSize;
    constructor(public payload: number) {}
  }

}