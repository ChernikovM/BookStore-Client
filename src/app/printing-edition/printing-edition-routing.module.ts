import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PECatalogComponent } from './pecatalog/pecatalog.component';
import { PrintingEditionDetailsComponent } from './printing-edition-details/printing-edition-details.component';

export const routes: Routes = [
  { path: 'catalog', component: PECatalogComponent },
  { path: 'details/:id', component: PrintingEditionDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintingEditionRoutingModule { }
