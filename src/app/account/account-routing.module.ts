import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalContainerComponent } from '../shared/modal-container/modal-container.component';
import { ResetPasswordGuard } from '../shared/providers/reset-password.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [ResetPasswordGuard], runGuardsAndResolvers: 'always'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
