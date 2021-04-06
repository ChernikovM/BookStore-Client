import { Injectable } from '@angular/core';
import { IJwtPairModel } from '../../models/JwtPair/IJwtPairModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private _accessToken: string = 'AccessToken';
  private _refreshToken: string = 'RefreshToken';
  private _rememberMe: string = 'RememberMe';


  constructor() { }

  getItem(key: string): any{
    let result = null;
    
    try{
      result = JSON.parse(localStorage.getItem(key)!);
    } 
    catch(ex){
      console.error(`Error getting ${key} from localStorage.`, ex);
    }

    return result;
  }

  getRememberValue(): boolean | null{
    let value = this.getItem(this._rememberMe);
    return JSON.parse(value);
  }

  getTokenPair(): IJwtPairModel | null{

    let accessToken = null;
    let refreshToken = null;

    let rememberValue: boolean | null = this.getRememberValue();

    if(rememberValue === null){
      return null;
    }

    if(rememberValue === false){
      accessToken = sessionStorage.getItem(this._accessToken);
      refreshToken = sessionStorage.getItem(this._refreshToken);
    }
    else if(rememberValue == true){
      accessToken = this.getItem(this._accessToken);
      refreshToken = this.getItem(this._refreshToken);
    }

    if(!accessToken || !refreshToken){
      return null;
    }

    return { accessToken: accessToken!, refreshToken: refreshToken! };
  }

  removeItem(key: string){
    try{
      localStorage.removeItem(key);
    }
    catch(ex) {
      console.error(`Error removing ${key} from localStorage.`, ex);
    }
  }

  removeTokenPair(){
    this.removeItem(this._accessToken);
    this.removeItem(this._refreshToken);

    this.removeItem(this._rememberMe);
  }

  setItem(key: string, value: any){
    try{
      localStorage.setItem(key, JSON.stringify(value));
    }
    catch(ex){
      console.error(`Error setting ${key} to localStorage.`, ex);
    }
  }

  setTokenPair(pair: IJwtPairModel, rememberMe: boolean){
    this.setItem(this._rememberMe, rememberMe);

    if(rememberMe){
      this.setItem(this._accessToken, pair.accessToken);
      this.setItem(this._refreshToken, pair.refreshToken);
      return;
    }

    sessionStorage.setItem(this._accessToken, pair.accessToken);
    sessionStorage.setItem(this._refreshToken, pair.refreshToken);
  }

  clear(){
    localStorage.clear();
    sessionStorage.clear();
  }

}
