import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { IUserModel } from 'src/app/shared/models/User/IUserModel';
import { IResetPasswordTokenModel } from '../../models/Account/ResetPassword/IResetPasswordTokenModel';
import { IJwtPairModel } from '../../models/JwtPair/IJwtPairModel';
import { IMessageResponse } from '../../models/Message/IMessageResponse';
import { AccountService } from '../../services/account/account.service';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { UsersActions } from './users.actions';

export class UsersStateModel {
  public currentUser!: IUserModel | null;
  public errors!: string[];
  public restPasswordToken!: string;
  public id!: string;
  public emailForResetPassword!: string;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    currentUser: null,
    errors: [],
    restPasswordToken: '',
    id: '',
    emailForResetPassword: ''

  }
})
@Injectable()
export class UsersState {

  @Selector()
  static currentUser(state: UsersStateModel) {
      return state.currentUser;
  }

  @Selector()
  static getEmailForResettingPassword(state: UsersStateModel){
    return state.emailForResetPassword;
  }

  constructor(
    private _accountService: AccountService, 
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _errorHandler: ErrorHandlerService
    ){ }

  @Action(UsersActions.Register)
  register(context : StateContext<UsersStateModel>, { payload }: UsersActions.Register) {

    return this._accountService.registration(payload).pipe(
      tap((result: IUserModel) => {
        const state = context.getState();
        context.setState({
          ...state,
          currentUser: result,
        });
        //TODO: redirect to emailConfiramtionInfo page
      }),
      catchError((error) => {
        this._errorHandler.handleErrors(error.error.errors);
        return of(error);
      }),
    );

  }

  @Action(UsersActions.Login)
  login(context : StateContext<UsersStateModel>, { payload, returnUrl }: UsersActions.Login) {
    return this._accountService.login(payload).pipe(
      tap((result: IJwtPairModel) => {
        this._localStorageService.setTokenPair(result, payload.remember!);

        if(returnUrl){
          this._router.navigate([returnUrl]);
        }
        else {
          //TODO: redirect to userDetailsPage or PE-listPage by role
        }
      }),
      catchError(error => {
        this._errorHandler.handleErrors(error.error.errors);
        return of(error);
      }),
    );
  }

  @Action(UsersActions.Logout)
  logout(context : StateContext<UsersStateModel>, { returnUrl }: UsersActions.Logout) {

    return this._accountService.logout().pipe(
      tap( (result: IMessageResponse) => {
        this._localStorageService.removeTokenPair();
        if(returnUrl){
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigateByUrl(returnUrl);
        }
      }),
      catchError( error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            this._localStorageService.removeTokenPair();
          }
        }
        this._errorHandler.handleErrors(error.error.errors);
        return of(error);
      }),
    );
  }

  @Action(UsersActions.CheckEmail)
  checkEmail(context: StateContext<UsersStateModel>, { payload }: UsersActions.CheckEmail){
    
    return this._accountService.checkEmail(payload).pipe(
      tap( (result: boolean) => {
        var state = context.getState();
        context.setState({
          ...state,
          emailForResetPassword: payload.email,

        });
        this._router.navigate(['account/resetPassword']);
        //TODO: redirect to reset password page
      }),
      catchError( error => {
        this._errorHandler.handleErrors(error.error.errors);
        return of(error);
      })
    );
  }


  @Action(UsersActions.ResetPassword)
  resetPassword(context: StateContext<UsersStateModel>, {payload}: UsersActions.ResetPassword){

    return this._accountService.resetPassword(payload).pipe(
      tap( (result) => {
        var state = context.getState();
        context.setState({
          ...state,
          emailForResetPassword: '',

        });
        this._router.navigate(['account/signin']);
        //TODO: tell the user thar email was sent
      }),
      catchError( error => {
        debugger;
        this._errorHandler.handleErrors(error.error.errors);
        return of(error);
      })
    );


  }



}
