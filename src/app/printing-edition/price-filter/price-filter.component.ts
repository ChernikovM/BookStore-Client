import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ViewCollectionActions } from 'src/app/shared/store/viewCollection/view-collection.actions';
import { ViewCollectionState } from 'src/app/shared/store/viewCollection/view-collection.state';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css']
})
export class PriceFilterComponent implements OnInit {

  @Output() update = new EventEmitter();

  @Select(ViewCollectionState.getFiltersArray) filtersArray$!: Observable<string[]>;

  filtersArray: string[] = [];
  priceFilterForm: FormGroup;

  constructor(private _store: Store, private _formBuilder: FormBuilder) {

    this.priceFilterForm = this._formBuilder.group({
      minPrice: ["", [Validators.required, Validators.min(0), Validators.max(9999999), Validators.pattern('^[0-9]*$')]],
      maxPrice: ["", [Validators.required, Validators.min(0), Validators.max(9999999), Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
    this.filtersArray$.subscribe(data => this.filtersArray = data);
  }

  private updateFiltersArray(){
    this.filtersArray = this.filtersArray.filter(x => x.startsWith("Price") === false);

    let newFilter: string = '';

    newFilter += `Price>${this.priceFilterForm.value.minPrice}&&Price<${this.priceFilterForm.value.maxPrice}`;

    this.filtersArray.push(newFilter);
  }

  onSubmit(){

    this.updateFiltersArray();
    this._store.dispatch(new ViewCollectionActions.UpdateFiltersArray(this.filtersArray));
    this.update.emit();
  }

  validateForm(): boolean{
    
    if(this.priceFilterForm.valid === false){
      return false;
    }
    if(JSON.parse(this.priceFilterForm.value.minPrice) > JSON.parse(this.priceFilterForm.value.maxPrice)){
      return false;
    }
    if(JSON.parse(this.priceFilterForm.value.maxPrice) === 0){
      return false;
    }

    return true;
  }
}
