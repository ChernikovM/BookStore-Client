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
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesizeDropdownComponent } from './components/pagesize-dropdown/pagesize-dropdown.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavBarComponent,
    JumbotronComponent,
    FilterablePopoverComponent,
    PaginationComponent,
    PagesizeDropdownComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forRoot(states),
    NgbModule,
    NgbToastModule
  ],
  exports: [
    HeaderComponent,
    NavBarComponent,   
    FilterablePopoverComponent,
    PaginationComponent,
    PagesizeDropdownComponent
  ]
})
export class SharedModule { }
