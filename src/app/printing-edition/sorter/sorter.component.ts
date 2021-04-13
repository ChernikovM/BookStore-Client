import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { ViewCollectionActions } from 'src/app/shared/store/viewCollection/view-collection.actions';

enum sortableProperty{
  Title = "Title",
  Price = "Price"
}

enum sortableDirection{
  Ascending = "Asc",
  Descending = "Desc"
}

@Component({
  selector: 'app-sorter',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.css']
})
export class SorterComponent implements OnInit {

  @Output() update = new EventEmitter()

  sortableProperties = sortableProperty;
  sortableDirections = sortableDirection;

  currentProp: sortableProperty;
  currentDirection: sortableDirection;
  
  constructor(private _store: Store) { 
    this.currentProp = sortableProperty.Title;
    this.currentDirection = sortableDirection.Ascending;
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  updateSortString(){
    let newString = `${this.currentProp}+${this.currentDirection}`;
    this._store.dispatch(new ViewCollectionActions.SetSortString(newString));
  }

  onSubmit(){
    this.updateSortString();
    this.update.emit();
  }

  updateCurrentProp(newValue: string){
    this.currentProp = sortableProperty[newValue as keyof typeof sortableProperty];
  }

  updateCurrentDirection(newValue: string){
    this.currentDirection = sortableDirection[newValue as keyof typeof sortableDirection];
  }

  getItemsArrayFromEnum(value: any): string[]{
    
    let result = [];

    for(let i of Object.keys(value)){
      result.push(i);
    }

    return result;
  }
}
