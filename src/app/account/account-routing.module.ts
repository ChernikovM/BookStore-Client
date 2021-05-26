import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmationFailComponent } from './email-confirmation-fail/email-confirmation-fail.component';
import { EmailConfirmationSuccessComponent } from './email-confirmation-success/email-confirmation-success.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InvalidResetTokenComponent } from './invalid-reset-token/invalid-reset-token.component';
import { PasswordChangedSuccessfullComponent } from './password-changed-successfull/password-changed-successfull.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'resetPassword', component: ResetPasswordComponent},
  { path: 'emailSent', component: EmailSentComponent},
  { path: 'invalidResetPasswordLink', component: InvalidResetTokenComponent},
  { path: 'passwordChangedSuccessfull', component: PasswordChangedSuccessfullComponent},
  { path: 'emailConfirmation', component: EmailConfirmationComponent},
  { path: 'emailConfirmationSuccess', component: EmailConfirmationSuccessComponent},
  { path: 'emailConfirmationFail', component: EmailConfirmationFailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
