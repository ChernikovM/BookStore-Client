import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILoginModel } from '../../models/Account/Login/ILoginModel';
import { IRegistrationModel } from '../../models/Account/Registration/IRegistrationModel';
import { IJwtPairModel } from '../../models/JwtPair/IJwtPairModel';
import { IMessageResponse } from '../../models/Message/IMessageResponse';
import { IUserModel } from '../../models/User/IUserModel';
import { IPasswordChangeModel } from '../../models/Account/ResetPassword/IPasswordChangeModel';
import { IEmailModel } from '../../models/Account/ResetPassword/IForgotPasswordModel';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl: string;

  constructor(private http: HttpClient, private _localStorageService: LocalStorageService) {
    this.apiUrl = environment.apiUrl + '/accounts';
  }

  isLoggedIn(): boolean{

    if(this._localStorageService.getTokenPair() === null){
      return false;
    }

    return true;
  }

  registration(model: IRegistrationModel): Observable<IUserModel>{
    return this.http.post<IUserModel>(`${this.apiUrl}/register`, model);
  }

  login(model: ILoginModel): Observable<IJwtPairModel>{
    return this.http.post<IJwtPairModel>(`${this.apiUrl}/login`, model);
  }

  refreshTokens(refreshToken: { refreshToken: string }): Observable<IJwtPairModel>{
    return this.http.post<IJwtPairModel>(`${this.apiUrl}/refreshTokens`, refreshToken);
  }

  logout(): Observable<IMessageResponse>{
    return this.http.get<IMessageResponse>(`${this.apiUrl}/logout`);
  }

  checkEmail(model: IEmailModel): Observable<boolean>{
    return this.http.post<boolean>(`${this.apiUrl}/checkEmail`, model);
  }

  resetPassword(model: IPasswordChangeModel): Observable<IMessageResponse>{
    return this.http.post<IMessageResponse>(`${this.apiUrl}/resetPassword`, model);
  }
}
