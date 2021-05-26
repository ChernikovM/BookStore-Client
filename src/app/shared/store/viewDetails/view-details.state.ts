import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { ViewDetailsActions } from './view-details.actions';

export class ViewDetailsStateModel {
  public item: any;
}

const defaults = {
  item: null
};

@State<ViewDetailsStateModel>({
  name: 'viewDetails',
  defaults
})
@Injectable()
export class ViewDetailsState {
  constructor(){}

  @Selector()
  static getData(state: ViewDetailsStateModel){
    return state.item;
  }

  @Action(ViewDetailsActions.GetData)
  getData(context: StateContext<ViewDetailsStateModel>, {service, id}: ViewDetailsActions.GetData){
    const state = context.getState();
    return service.getItemDetails(id).pipe(
      tap(result => { 
        context.setState({
          ...state,
          item: result
        })
      })
    );
  }
}
