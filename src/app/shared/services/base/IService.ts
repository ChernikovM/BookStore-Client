import { Observable } from "rxjs";
import { IIndexRequestModel } from "../../models/IndexRequest/IIndexRequestModel";
import { IIndexResponseModel } from "../../models/IndexResponse/IIndexResponseModel";

export interface IService{
    getCollection(payload: IIndexRequestModel): Observable<IIndexResponseModel>;
}