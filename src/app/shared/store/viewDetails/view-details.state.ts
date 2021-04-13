import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from '../../services/error-handler/error-handler.service';
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
  constructor(private _errorHandler: ErrorHandlerService){}

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
      }),
      catchError((error) => {
        this._errorHandler.handleErrors(error.error.errors);
        return of(error);
      })
    );
  }
}
