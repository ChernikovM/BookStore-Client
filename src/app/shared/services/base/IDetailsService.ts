import { Observable } from "rxjs";

export interface IDetailsService{
    getItemDetails(id: number): Observable<any>;
}