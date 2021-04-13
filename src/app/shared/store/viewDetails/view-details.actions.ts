import { IDetailsService } from "../../services/base/IDetailsService";

export enum EViewDetailsActions{
  GetData = '[ViewDetails] Get Data',
}

export namespace ViewDetailsActions{

  export class GetData {
    static readonly type = EViewDetailsActions.GetData;
    constructor(public service: IDetailsService, public id: number) { }
  }
}