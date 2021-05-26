import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IIndexRequestModel } from '../../models/IndexRequest/IIndexRequestModel';
import { IIndexResponseModel } from '../../models/IndexResponse/IIndexResponseModel';
import { IMessageResponse } from '../../models/Message/IMessageResponse';
import { IUserModel } from '../../models/User/IUserModel';
import { IUserUpdateModel } from '../../models/User/IUserUpdateModel';
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

  getmyProfile(): Observable<IUserModel>{
    return this.http.get<IUserModel>(`${this.apiUrl}`);
  }

  updateProfile(payload: IUserUpdateModel) : Observable<IMessageResponse>{
    return this.http.patch<IMessageResponse>(`${this.apiUrl}`, {...payload, EmailConfirmationCallbackUrl: environment.emailConfirmationUrl});
  }
}
