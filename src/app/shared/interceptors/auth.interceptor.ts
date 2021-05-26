import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { AccountService } from '../services/account/account.service';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import { catchError, switchMap } from 'rxjs/operators';
import { IJwtPairModel } from '../models/JwtPair/IJwtPairModel';
import { RouterService } from '../services/router/router.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing: boolean = false;

  constructor(
    private _accountService: AccountService,
    private _localStorageService: LocalStorageService,
    private _router: RouterService,
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokens = this._localStorageService.getTokenPair();

    if(tokens){
      request = this.addTokenToHeader(request, tokens.accessToken);
    }

    return next.handle(request).pipe(
        catchError((error) => {
          if(error instanceof HttpErrorResponse && error.status === 401){
            return this.handle401Error(request, next, tokens);
          }
          else{
            //this._globalErrorHandler.handleError(error);
            // this._errorHandler.handleHttpResponseError(error);
            // this._errorHandler.handleErrors(error.error.errors);
            throw error;
          }
        })
    );
  }

  refresh(request: HttpRequest<any>, next: HttpHandler, tokens: IJwtPairModel | null){
    this.isRefreshing = true;

    return this._accountService.refreshTokens({refreshToken: tokens?.refreshToken!}).pipe(
      switchMap((newPair: IJwtPairModel) => {
        this._localStorageService.setTokenPair(newPair, this._localStorageService.getRememberValue()!);
        return next.handle(this.addTokenToHeader(request, newPair.accessToken));
      }),
      catchError(error  => {
        if(error instanceof HttpErrorResponse && (error.status === 400 || error.status === 401)){
          return this._router.navigateInZone(['account/signin'], {queryParams: {returnUrl: this._router.url}});
        }
        
        return of(error);
      })
    );    
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler, tokens: IJwtPairModel | null){
    
    if(this.isRefreshing === false){
      this.isRefreshing = true;
      
      return this._accountService.refreshTokens({refreshToken: tokens?.refreshToken!}).pipe(
        switchMap((newTokenPair) => {
          this.isRefreshing = false;
          this._localStorageService.setTokenPair(newTokenPair, this._localStorageService.getRememberValue()!);
          
          return next.handle(this.addTokenToHeader(request, newTokenPair.accessToken));
        }),
        catchError(error => {
          
          if(error instanceof HttpErrorResponse && (error.status === 400 || error.status === 401)){
            return this._router.navigateInZone(['account/signin'], {queryParams: {returnUrl: this._router.url}});
          }
          
          return of(error.error);
        })
      )
      
    } 
    //if refresh request returned 401
    else {
      this.isRefreshing = false;
      return this._router.navigateInZone(['account/signin'], {queryParams: {returnUrl: this._router.url}});
    }
  }

  addTokenToHeader(request: HttpRequest<any>, token: string){
    return request.clone({
      setHeaders: {
        Authorization: `bearer ${token}`,
      },

    });
  }
}
