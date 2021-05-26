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

  emailConfirmationUrl: string;

  constructor(private http: HttpClient, private _localStorageService: LocalStorageService) {
    this.apiUrl = environment.apiUrl + '/account';
    this.emailConfirmationUrl = environment.emailConfirmationUrl;
  }

  isLoggedIn(): boolean{

    if(this._localStorageService.getTokenPair() === null){
      return false;
    }

    return true;
  }

  registration(model: IRegistrationModel): Observable<IUserModel>{
    return this.http.post<IUserModel>(`${this.apiUrl}/register`, {...model, callbackUrl: this.emailConfirmationUrl});
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

  sendPasswordResetMail(payload: {EmailAddress: string}): Observable<IMessageResponse>{
    let body = {...payload, CallbackUrl: environment.passwordResetUrl}
    return this.http.post<IMessageResponse>(`${this.apiUrl}/SendPasswordResetMail`, body);
  }

  checkToken(payload: {id: string, token: string}): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/CheckPasswordResetToken/${payload.id}?token=${payload.token}`);
  }

  changePassword(payload: {id:string, token: string, newPassword:string, confirmNewPassword: string}): Observable<IMessageResponse>{
    return this.http.patch<IMessageResponse>(`${this.apiUrl}/SetNewPassword/${payload.id}`, payload);
  }

  emailConfirm(payload: {id: string, token: string}): Observable<IMessageResponse>{
    return this.http.get<IMessageResponse>(`${this.apiUrl}/ConfirmEmail?userId=${payload.id}&token=${payload.token}`);
  }
}
