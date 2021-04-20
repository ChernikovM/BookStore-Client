export enum ESharedActions{
  SetCurrency = '[Shared] Set Currency',
}

export namespace SharedActions {
  export class SetCurrency{
    static readonly type = ESharedActions.SetCurrency;
    constructor(public payload: number) { }
  }
  
}
