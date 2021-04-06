import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ViewCollectionActions } from '../../store/viewCollection/view-collection.actions';
import { ViewCollectionState } from '../../store/viewCollection/view-collection.state';


@Component({
  selector: 'app-filterable-popover',
  templateUrl: './filterable-popover.component.html',
  styleUrls: ['./filterable-popover.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterablePopoverComponent implements OnInit{

  @Select(ViewCollectionState.getFilterColumnName) filterColumn$!: Observable<string>;
  @Select(ViewCollectionState.getFiltersArray) filters$!: Observable<string[]>;

  @Output() filter = new EventEmitter();

  filters: string[] = [];
  filterColumn: string = '';
  value: string = '';

  currentFiltersArray: string[] = [];

  currentFiltersSet : {expr: string, value: string, full: string}[] = [];

  statement: string = '='; //действие фильтра( number: =,>,< | string: =,Contains('text') etc | bollean: =)

  constructor(private _store: Store) {
    
  }

  ngOnInit(): void {
    //TODO: распарсить массив фильтров и выбрать фильтры для данного поповера.
    //Отобразить их в виде кнопок
    //При нажатии на кнопку этот фильтр будет удаляться из массива фильтров и диспатч.АпдейтФильтерс.
    //
    this.filters$.subscribe(data => this.filters = data);
    this.filterColumn$.subscribe(data => this.filterColumn = data[0].toUpperCase() + data.slice(1));

    this.currentFiltersArray = this.filters.filter(x => x.split('.')[0] === this.filterColumn);
    this.initFiltersSet();
  }

  onSubmit(){    
    var newExpression = this.filterColumn + `.Contains(\"${this.value}\")`; //для строк только
    
    if(this.filters?.includes(newExpression))
    {
      return;
    }

    this.filters.push(newExpression);

    this.updateFilters();
  }

  initFiltersSet(){
    var exprRegex = /(?<=\.).*?(?=\()/;
    var valueRegex = /(?<=\(")(.*?)(?="\))/;

    this.currentFiltersArray.forEach(element => {
      this.currentFiltersSet.push({
        expr: element.match(exprRegex)![0],
        value: element.match(valueRegex)![0],
        full: element
      });
    });
  }

  updateFilters(){
    this._store.dispatch(new ViewCollectionActions.UpdateFiltersArray(this.filters));

    this.filter.emit();
  }

  onRemove(filter: string){
    const index: number = this.filters.indexOf(filter);
    if (index !== -1) {
      this.filters.splice(index, 1);
      this.updateFilters();
    }
  }

}
