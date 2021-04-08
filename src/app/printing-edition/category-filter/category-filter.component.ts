import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PrintingEditionType } from 'src/app/shared/providers/enums/PrintingEditionType';
import { EnumToArrayPipe } from 'src/app/shared/providers/pipes/enum-to-array.pipe';
import { ViewCollectionActions } from 'src/app/shared/store/viewCollection/view-collection.actions';
import { ViewCollectionState } from 'src/app/shared/store/viewCollection/view-collection.state';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {

  @Output() update = new EventEmitter();

  @Select(ViewCollectionState.getFiltersArray) filtersArray$!: Observable<string[]>;
  types = PrintingEditionType;
  filtersArray: string[] = [];
  typesCheckBoxes: {index: number, name: string, value: boolean}[] = [];

  constructor(private _store: Store, private _pipe: EnumToArrayPipe) { }

  ngOnInit(): void {
    this.initTypesCheckboxes();

    this.filtersArray$.subscribe(data => this.filtersArray = data);
  }

  initTypesCheckboxes(){
    let arr = this._pipe.transform(PrintingEditionType, []);
    let currentValue: boolean = true;

    arr.forEach(element => {
      currentValue = true;
      if(element.key === 0){
        currentValue = false;
      }
      this.typesCheckBoxes.push({index: element.key, name: element.value, value: currentValue});  
    });
  }

  OnChangeCheckBox(){
    this.filtersArray = this.filtersArray.filter(x => x.startsWith("Type") === false);

    let newFilter: string = '';

    let checkedTypes = this.typesCheckBoxes.filter(x => x.value === true);

    for(let i = 0; i < checkedTypes.length; ++i){
      if(i !== 0){
        newFilter += '||';
      }
      newFilter += `Type=\"${checkedTypes[i].index}\"`;
    }

    if(checkedTypes.length === 0){
      newFilter += 'Type=\"-1\"';
    }

    this.filtersArray.push(newFilter);

    this._store.dispatch(new ViewCollectionActions.UpdateFiltersArray(this.filtersArray));
    
    this.onUpdate();
  }


  onUpdate(){
    this.update.emit();
  }

}
