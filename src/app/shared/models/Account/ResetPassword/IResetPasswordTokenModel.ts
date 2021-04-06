import { BaseModel } from "../../Base/BaseModel";

export interface IResetPasswordTokenModel extends BaseModel{
    id: string;
    token: string;
}