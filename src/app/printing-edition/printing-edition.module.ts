import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintingEditionRoutingModule, routes } from './printing-edition-routing.module';
import { PECatalogComponent } from './pecatalog/pecatalog.component';
import { RouterModule } from '@angular/router';
import { PrintingEditionService } from '../shared/services/printing-edition/printing-edition.service';
import { SharedModule } from '../shared/shared.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { EnumToArrayPipe } from '../shared/providers/pipes/enum-to-array.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { MasterFilterComponent } from './master-filter/master-filter.component';
import { SorterComponent } from './sorter/sorter.component';
import { PrintingEditionDetailsComponent } from './printing-edition-details/printing-edition-details.component';


@NgModule({
  declarations: [
    PECatalogComponent,
    SideBarComponent,
    PriceFilterComponent,
    CategoryFilterComponent,
    MasterFilterComponent,
    SorterComponent,
    PrintingEditionDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrintingEditionRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers:[
    PrintingEditionService,
    EnumToArrayPipe
  ]
})
export class PrintingEditionModule { }
