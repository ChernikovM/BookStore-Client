import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IIndexRequestModel } from '../../models/IndexRequest/IIndexRequestModel';
import { IIndexResponseModel } from '../../models/IndexResponse/IIndexResponseModel';
import { IDetailsService } from '../base/IDetailsService';
import { IService } from '../base/IService';

@Injectable({
  providedIn: 'root'
})
export class PrintingEditionService implements IService, IDetailsService{

  apiUrl: string = environment.apiUrl + '/printingEditions';

  constructor(private http: HttpClient) { }

  getItemDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getCollection(payload: IIndexRequestModel): Observable<IIndexResponseModel> {
    return this.http.post<IIndexResponseModel>(`${this.apiUrl}`, payload);
  }


}
