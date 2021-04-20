import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CurrencyType } from '../../providers/enums/CurrencyType';
import { SharedActions } from './shared.actions';

export class SharedStateModel {
  public currency!: CurrencyType;
}

const defaults = {
  currency: CurrencyType.USD
};

@State<SharedStateModel>({
  name: 'shared',
  defaults
})
@Injectable()
export class SharedState {

  @Selector()
  static getCurrency(state: SharedStateModel){
    return state.currency;
  }

  @Action(SharedActions.SetCurrency)
  setCurrency(context: StateContext<SharedStateModel>, { payload }: SharedActions.SetCurrency) {
    const state = context.getState();
    context.setState({ 
      ...state,
      currency: payload,
    });
  }
}
