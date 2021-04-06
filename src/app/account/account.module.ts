import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/account/account-routing.module'
import { AccountService } from '../shared/services/account/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { ModalContainerComponent } from '../shared/modal-container/modal-container.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    SignInComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    //ModalContainerComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgBootstrapFormValidationModule,
    
  ],
  providers: [
    AccountService,

  ],
  entryComponents: [
    RegistrationComponent
  ]
})
export class AccountModule { }
