import { ILoginModel } from "../../models/Account/Login/ILoginModel";
import { IRegistrationModel } from "../../models/Account/Registration/IRegistrationModel";
import { IEmailModel } from "../../models/Account/ResetPassword/IForgotPasswordModel";
import { IPasswordChangeModel } from "../../models/Account/ResetPassword/IPasswordChangeModel";

export enum EUsersAction {
  Register = '[Users] Register',
  Login = '[Users] Login',
  Logout = '[Users] Logout',
  CheckEmail = '[Users] CheckEmail',
  ResetPassword = '[Users] ResetPassword'
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

  export class ResetPassword{
    static readonly type = EUsersAction.ResetPassword;
    constructor(public payload: IPasswordChangeModel) {}
  }

  export class CheckEmail{
    static readonly type = EUsersAction.CheckEmail;
    constructor(public payload: IEmailModel) {}
  }

}

