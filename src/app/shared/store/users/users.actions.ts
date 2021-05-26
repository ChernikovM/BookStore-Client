import { ILoginModel } from "../../models/Account/Login/ILoginModel";
import { IRegistrationModel } from "../../models/Account/Registration/IRegistrationModel";
import { IEmailModel } from "../../models/Account/ResetPassword/IForgotPasswordModel";
import { IPasswordChangeModel } from "../../models/Account/ResetPassword/IPasswordChangeModel";
import { IUserUpdateModel } from "../../models/User/IUserUpdateModel";

export enum EUsersAction {
  Register = '[Users] Register',
  Login = '[Users] Login',
  Logout = '[Users] Logout',
  GetMyProfile = '[Users] GetMyprofile',
  UpdateProfile = '[Users] UpdateProfile',
  SendResetPasswordMail = '[Users] SendResetPasswordMail',
  CheckPasswordResetToken = '[Users] CheckPasswordResetToken',
  ChangePassword = '[Users] ChangePassword',
  EmailConfirm = '[Users] EmailConfirm'
}

export namespace UsersActions{

  export class Register {
    static readonly type = EUsersAction.Register;
    constructor(public payload: IRegistrationModel) { }
  }

  export class Login {
    static readonly type = EUsersAction.Login;
    constructor(public payload: ILoginModel, public returnUrl?: string) { }
  }

  export class Logout {
    static readonly type = EUsersAction.Logout;
    constructor(public returnUrl: string) {}
  }

  export class GetMyProfile{
    static readonly type = EUsersAction.GetMyProfile;
    constructor() {}
  }

  export class UpdateProfile{
    static readonly type = EUsersAction.UpdateProfile;
    constructor(public payload : IUserUpdateModel ) {}
  }

  export class SendResetPasswordMail{
    static readonly type = EUsersAction.SendResetPasswordMail;
    constructor(public payload: {EmailAddress: string}) {}
  }

  export class CheckPasswordResetToken{
    static readonly type = EUsersAction.CheckPasswordResetToken;
    constructor(public payload: {id: string, token: string}) {}
  }

  export class ChangePassword{
    static readonly type = EUsersAction.ChangePassword;
    constructor(public payload: {id: string, token: string, newPassword: string, confirmNewPassword: string}) {}
  }

  export class EmailConfirm{
    static readonly type = EUsersAction.EmailConfirm;
    constructor(public payload: {id: string, token: string}){}
  }

}

