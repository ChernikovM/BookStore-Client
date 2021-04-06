import { IBaseModel } from "./IBaseModel";

export class BaseModel implements IBaseModel{
    
    errors: string[];

    constructor()
    {
        this.errors = [];
    }
}