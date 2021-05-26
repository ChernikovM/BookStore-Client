import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routes } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { states } from './store/states';
import { NgxsModule } from '@ngxs/store';
import { FilterablePopoverComponent } from './components/filterable-popover/filterable-popover.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesizeDropdownComponent } from './components/pagesize-dropdown/pagesize-dropdown.component';
import { EnumToArrayPipe } from './providers/pipes/enum-to-array.pipe';
import { CartComponent } from './components/cart/cart.component';
import { CartLabelComponent } from './components/cart-label/cart-label.component';
import { SuccessPageComponent } from './components/cart/successPage/success-page.component';
import { CancelPageComponent } from './components/cart/cancelPage/cancel-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent,
    JumbotronComponent,
    FilterablePopoverComponent,
    PaginationComponent,
    PagesizeDropdownComponent,
    EnumToArrayPipe,
    CartComponent,
    CartLabelComponent,
    SuccessPageComponent,
    CancelPageComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forRoot(states),
    NgbModule,
  ],
  exports: [
    HeaderComponent,
    NavBarComponent,   
    FilterablePopoverComponent,
    PaginationComponent,
    PagesizeDropdownComponent,
    EnumToArrayPipe
  ]
})
export class SharedModule { }
