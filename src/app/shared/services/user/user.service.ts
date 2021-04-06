import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IIndexRequestModel } from '../../models/IndexRequest/IIndexRequestModel';
import { IIndexResponseModel } from '../../models/IndexResponse/IIndexResponseModel';
import { IService } from '../base/IService';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IService{

  apiUrl: string = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  getCollection(payload: IIndexRequestModel): Observable<IIndexResponseModel> {
    return this.http.post<IIndexResponseModel>(`${this.apiUrl}`, payload);
  }
}
