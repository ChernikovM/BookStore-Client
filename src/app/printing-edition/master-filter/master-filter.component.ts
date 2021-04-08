import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PrintingEdition } from 'src/app/shared/models/PrintingEdition/PrintinEdition';
import { EnumToArrayPipe } from 'src/app/shared/providers/pipes/enum-to-array.pipe';
import { ViewCollectionActions } from 'src/app/shared/store/viewCollection/view-collection.actions';
import { ViewCollectionState } from 'src/app/shared/store/viewCollection/view-collection.state';

enum searchableProp {
  Title = 'Title',
  Authors = 'Authors'
}

enum searchableAction {
  Equals = 'Equals',
  Contains = 'Contains'
}

@Component({
  selector: 'app-master-filter',
  templateUrl: './master-filter.component.html',
  styleUrls: ['./master-filter.component.css']
})
export class MasterFilterComponent implements OnInit {

  @Select(ViewCollectionState.getFiltersArray) filtersArray$!: Observable<string[]>
  @Output() update = new EventEmitter();
  
  searchableProps = searchableProp;
  searchableActions = searchableAction;

  filtersArray!: string[];

  currentProp: searchableProp = searchableProp.Title;
  currentAction: searchableAction = searchableAction.Contains;
  currentValue: string = '';

  constructor(private _store: Store, private _enumToArrayPipe: EnumToArrayPipe) { }

  ngOnInit(): void {
    this.filtersArray$.subscribe(data => this.filtersArray = data);
  }

  getItemsArrayFromEnum(value: any): string[]{
    
    let result = [];

    for(let i of Object.keys(value)){
      result.push(i);
    }

    return result;
  }

  updateCurrentProp(newValue: string){
    this.currentProp = searchableProp[newValue as keyof typeof searchableProp];
    this.currentValue = '';
  }

  updateCurrentAction(newValue: string){
    this.currentAction = searchableAction[newValue as keyof typeof searchableAction];
    this.currentValue = '';
  }

  onChangeFilter(){

    this.getItemsArrayFromEnum(this.searchableProps).forEach(element => {
      this.filtersArray = this.filtersArray.filter(x => x.startsWith(element) === false);
    });

    if(this.currentValue === ''){
      this._store.dispatch(new ViewCollectionActions.UpdateFiltersArray(this.filtersArray));
      this.onUpdate();
      return;
    }

    let peObj = new PrintingEdition();

    let newFilter: string = '';

    if(typeof(peObj[this.currentProp.toLowerCase() as keyof(PrintingEdition)]) === 'object'){
      newFilter = `${this.currentProp}.pe=>pe.${this.currentProp}.Where(author=>author.name.${this.currentAction}(\"${this.currentValue}\")).ToList().Count>0`;
    }
    else {
      newFilter = `${this.currentProp}.${this.currentAction}(\"${this.currentValue}\")`;
    }

    this.filtersArray.push(newFilter);
    
    this._store.dispatch(new ViewCollectionActions.UpdateFiltersArray(this.filtersArray));
    this.onUpdate();
  }

  onUpdate(){
    this.update.emit();
  }

}
