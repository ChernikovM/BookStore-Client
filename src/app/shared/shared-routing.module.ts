import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelPageComponent } from './components/cart/cancelPage/cancel-page.component';
import { CartComponent } from './components/cart/cart.component';
import { SuccessPageComponent } from './components/cart/successPage/success-page.component';

export const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'paymentSuccess', component: SuccessPageComponent},
  { path: 'paymentCancel', component: CancelPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
