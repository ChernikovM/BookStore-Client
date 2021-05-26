import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IUserModel } from 'src/app/shared/models/User/IUserModel';
import { IJwtPairModel } from '../../models/JwtPair/IJwtPairModel';
import { IMessageResponse } from '../../models/Message/IMessageResponse';
import { AccountService } from '../../services/account/account.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { RouterService } from '../../services/router/router.service';
import { UserService } from '../../services/user/user.service';
import { UsersActions } from './users.actions';

export class UsersStateModel {
  public currentUser!: IUserModel | null;
  public errors!: string[];
  public restPasswordToken!: string;
  public id!: string;
  public isPasswordResetTokenValid!: boolean;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    currentUser: null,
    errors: [],
    restPasswordToken: '',
    id: '',
    isPasswordResetTokenValid: false,

  }
})
@Injectable()
export class UsersState {

  @Selector()
  static currentUser(state: UsersStateModel) {
      return state.currentUser;
  }

  @Selector()
  static isResetPasswordTokenValid(state: UsersStateModel){
    return state.isPasswordResetTokenValid;
  }

  constructor(
    private _accountService: AccountService, 
    private _localStorageService: LocalStorageService,
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _router: RouterService
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
        this._router.navigateInZone(['account/emailSent']);
      })
    );

  }

  @Action(UsersActions.Login)
  login(context : StateContext<UsersStateModel>, { payload, returnUrl }: UsersActions.Login) {
    return this._accountService.login(payload).pipe(
      tap((result: IJwtPairModel) => {
        this._localStorageService.setTokenPair(result, payload.remember!);

        if(returnUrl){
          this._router.navigateInZone([returnUrl]);
        }
        else {
          this._router.navigateInZone(['/users/account']);
        }
      })
    );
  }

  @Action(UsersActions.Logout)
  logout(context : StateContext<UsersStateModel>, { returnUrl }: UsersActions.Logout) {

    return this._accountService.logout().pipe(
      tap( (result: IMessageResponse) => {
        this._localStorageService.removeTokenPair();
        var state = context.getState();
        context.setState({
          ...state,
          currentUser: null,
        });

        if(returnUrl){
          this._router.navigateInZone([returnUrl]);
        }
      }),
      catchError( error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            this._localStorageService.removeTokenPair();
          }
        }
        throw error;
      })
    );
  }

  @Action(UsersActions.SendResetPasswordMail)
  sendResetPasswordMail(context: StateContext<UsersStateModel>, { payload }: UsersActions.SendResetPasswordMail){

    return this._accountService.sendPasswordResetMail(payload).pipe(
      tap((result : IMessageResponse) => {
        this._router.navigateInZone(['account/emailSent']);
      }),
    );
  }

  @Action(UsersActions.GetMyProfile)
  getMyProfile(context: StateContext<UsersStateModel>){

    return this._userService.getmyProfile().pipe(
      tap( (result) =>{
        var state = context.getState();
        context.setState({
          ...state,
          currentUser: result
        });
      })
    );
  }

  @Action(UsersActions.UpdateProfile)
  updateProfile(context: StateContext<UsersStateModel>, {payload}: UsersActions.UpdateProfile){
    
    return this._userService.updateProfile(payload).pipe(
      tap( (result) =>{
        this._toastrService.success(result.message);
        context.dispatch(new UsersActions.GetMyProfile());
      })
    );
  }

  @Action(UsersActions.CheckPasswordResetToken)
  checkPasswordResetToken(context: StateContext<UsersStateModel>, {payload}: UsersActions.CheckPasswordResetToken){
    
    return this._accountService.checkToken(payload).pipe(
      tap( (result) =>{
        let state = context.getState();

        context.setState({
          ...state,
          isPasswordResetTokenValid: result
        });

        if(!result){
          this._router.navigateInZone(['account/invalidResetPasswordLink']);
        }
        
      })
    );
  }

  @Action(UsersActions.ChangePassword)
  changePassword(context: StateContext<UsersStateModel>, {payload}: UsersActions.ChangePassword){
    
    return this._accountService.changePassword(payload).pipe(
      tap( (result) =>{
        this._router.navigateInZone(['account/passwordChangedSuccessfull']);
      })
    );
  }

  @Action(UsersActions.EmailConfirm)
  emailConfirm(context: StateContext<UsersStateModel>, {payload}: UsersActions.EmailConfirm){
    
    return this._accountService.emailConfirm(payload).pipe(
      tap( (result) =>{
        this._router.navigateInZone(['account/emailConfirmationSuccess']);
      }),
      catchError( error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 400){
            this._router.navigateInZone(['account/emailConfirmationFail']);
          }
        }
        return of(error);
      })
    );
  }

}
