import { IBaseModel } from "../Base/IBaseModel";
import { IPageResponseModel } from "../Page/IPageResponseModel";

export interface IIndexResponseModel extends IBaseModel {
    pageModel: IPageResponseModel,
    sort: string,
    filter: string,
    dataCollection: any[],
    collectionCount: number,
}