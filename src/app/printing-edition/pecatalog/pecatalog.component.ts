import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PrintingEdition } from 'src/app/shared/models/PrintingEdition/PrintinEdition';
import { PrintingEditionService } from 'src/app/shared/services/printing-edition/printing-edition.service';
import { ViewCollectionActions } from 'src/app/shared/store/viewCollection/view-collection.actions';
import { ViewCollectionState, ViewCollectionStateModel } from 'src/app/shared/store/viewCollection/view-collection.state';

@Component({
  selector: 'app-pecatalog',
  templateUrl: './pecatalog.component.html',
  styleUrls: ['./pecatalog.component.css']
})
export class PECatalogComponent implements OnInit {

  constructor(private _peService: PrintingEditionService, private _store: Store) { }

  @Select(ViewCollectionState.getData) dataCollection$!: Observable<PrintingEdition[]>;

  ngOnInit(): void {
    this._store.dispatch(new ViewCollectionActions.GetData(this._peService));
  }

  getAuthorsList(pe: PrintingEdition): string{
    let result: string = '';
    let firstElement: boolean = true;

    pe.authors.forEach(author => {
      if(!firstElement){
        result += ', ';
      }
      if(firstElement){
        firstElement = false;
      }
      result += author.name;
    });

    return result;
  }

  updateView(){
    this._store.dispatch(new ViewCollectionActions.GetData(this._peService));
  }
}
