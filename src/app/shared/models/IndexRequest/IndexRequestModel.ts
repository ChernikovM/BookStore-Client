import { IFilterModel } from "../Filter/IFilterModel";
import { IPageRequestModel } from "../Page/IPageRequestModel";
import { ISortModel } from "../Sort/ISortModel";
import { IIndexRequestModel } from "./IIndexRequestModel";

export class IndexRequestModel implements IIndexRequestModel{
    pageRequestModel: IPageRequestModel;
    filter?: string;
    SortBy?: string;

    constructor() {
        this.pageRequestModel = {
            pageSize: 100, //TODO: to config file
        }
    }

}