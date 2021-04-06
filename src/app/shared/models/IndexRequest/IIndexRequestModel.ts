import { IFilterModel } from "../Filter/IFilterModel";
import { IPageRequestModel } from "../Page/IPageRequestModel";
import { ISortModel } from "../Sort/ISortModel";

export interface IIndexRequestModel {
    pageRequestModel: IPageRequestModel,
    filter?: string,
    SortBy?: string,
}